"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildIcosphere } from "./icosphere";

export interface IcoReactionParams {
    feed: number;
    kill: number;
    dA: number;
    dB: number;
}

export interface IcoReactionDiffusionCanvasProps extends IcoReactionParams {
    /** Change this value to re-seed the field (e.g. on preset change or reset). */
    seedKey: number;
    className?: string;
}

// How many times the base icosahedron is subdivided. 5 -> 10,242 vertices.
const SUBDIVISIONS = 6;
// Sim steps per displayed frame — the dynamics need many small steps to look smooth.
const ITERATIONS_PER_FRAME = 12;
const MAX_NEIGHBORS = 6;

// Fullscreen-quad vertex shader for the simulation/seed passes. The plane spans
// clip space [-1,1], so we forward its position straight to gl_Position.
const QUAD_VERT = /* glsl */ `
in vec3 position;
out vec2 vUv;
void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

// Gray-Scott update, but the Laplacian gathers each vertex's mesh neighbors from
// a lookup texture instead of a fixed 3x3 grid. Chemical A in .x, B in .y.
const SIM_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uState;
uniform sampler2D uNeighbors;
uniform float uFeed;
uniform float uKill;
uniform float uDa;
uniform float uDb;
uniform float uDt;
uniform float uTexSize;
uniform float uCount;
in vec2 vUv;
out vec4 outColor;

void main() {
    vec2 s = texture(uState, vUv).xy;
    float a = s.x;
    float b = s.y;

    // Recover this fragment's vertex index from its pixel coordinate.
    float vIndex = floor(gl_FragCoord.y) * uTexSize + floor(gl_FragCoord.x);

    // Umbrella Laplacian: mean(neighbors) - center. Works for both the 6-neighbor
    // vertices and the 12 original corners that only have 5.
    vec2 sum = vec2(0.0);
    float n = 0.0;
    for (int k = 0; k < ${MAX_NEIGHBORS}; k++) {
        vec2 luv = vec2((float(k) + 0.5) / float(${MAX_NEIGHBORS}), (vIndex + 0.5) / uCount);
        vec4 nb = texture(uNeighbors, luv);
        if (nb.z > 0.5) {
            sum += texture(uState, nb.xy).xy;
            n += 1.0;
        }
    }
    vec2 lap = sum / max(n, 1.0) - s;

    float reaction = a * b * b;
    float da = a + (uDa * lap.x - reaction + uFeed * (1.0 - a)) * uDt;
    float db = b + (uDb * lap.y + reaction - (uKill + uFeed) * b) * uDt;

    outColor = vec4(clamp(da, 0.0, 1.0), clamp(db, 0.0, 1.0), 0.0, 1.0);
}`;

// Seed/copy pass: blit a CPU-built state texture into a render target.
const COPY_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uSeed;
in vec2 vUv;
out vec4 outColor;
void main() {
    outColor = texture(uSeed, vUv);
}`;

// Mesh vertex shader: each vertex fetches its own A/B from the state texture and
// nudges itself outward by B for a little surface relief.
const MESH_VERT = /* glsl */ `
uniform sampler2D uState;
uniform float uDisplace;
in vec2 aStateUv;
out float vVis;
out vec3 vNormal;
void main() {
    vec2 s = texture(uState, aStateUv).xy;
    float v = clamp((s.x - s.y) * 1.2, 0.0, 1.0);
    vVis = 1.0 - v;
    vec3 displaced = position + normal * s.y * uDisplace;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}`;

const MESH_FRAG = /* glsl */ `
precision highp float;
in float vVis;
in vec3 vNormal;
out vec4 outColor;

vec3 ramp(float t) {
    // deep indigo -> violet -> fuchsia -> warm white, tuned to the site palette
    vec3 c0 = vec3(0.03, 0.02, 0.09);
    vec3 c1 = vec3(0.25, 0.10, 0.55);
    vec3 c2 = vec3(0.72, 0.20, 0.85);
    vec3 c3 = vec3(1.00, 0.95, 0.98);
    t = clamp(t, 0.0, 1.0);
    if (t < 0.33) return mix(c0, c1, t / 0.33);
    if (t < 0.66) return mix(c1, c2, (t - 0.33) / 0.33);
    return mix(c2, c3, (t - 0.66) / 0.34);
}

void main() {
    vec3 base = ramp(vVis);
    vec3 lightDir = normalize(vec3(0.4, 0.7, 0.6));
    float diff = clamp(dot(normalize(vNormal), lightDir), 0.0, 1.0);
    float lighting = 0.35 + 0.65 * diff;
    outColor = vec4(base * lighting, 1.0);
}`;

export function IcoReactionDiffusionCanvas({
    feed,
    kill,
    dA,
    dB,
    seedKey,
    className,
}: IcoReactionDiffusionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [webglFailed, setWebglFailed] = useState(false);

    // Live params read by the render loop without re-creating it.
    const paramsRef = useRef<IcoReactionParams>({ feed, kill, dA, dB });
    const seedRef = useRef(seedKey);
    const needsSeedRef = useRef(true);

    useEffect(() => {
        paramsRef.current = { feed, kill, dA, dB };
    }, [feed, kill, dA, dB]);

    useEffect(() => {
        if (seedKey !== seedRef.current) {
            seedRef.current = seedKey;
            needsSeedRef.current = true;
        }
    }, [seedKey]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");
        if (!gl) {
            // Defer out of the effect body so we don't setState synchronously.
            queueMicrotask(() => setWebglFailed(true));
            return;
        }

        // Prefer 16-bit float render targets; fall back to bytes (values live in [0,1]).
        const floatRenderable = !!gl.getExtension("EXT_color_buffer_float");
        const targetType = floatRenderable ? THREE.HalfFloatType : THREE.UnsignedByteType;

        const renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);

        // --- Precompute the icosphere + adjacency once. ---
        const mesh = buildIcosphere(SUBDIVISIONS);
        const count = mesh.count;
        const texSize = Math.ceil(Math.sqrt(count));

        // Per-vertex state-texture UV (vertex i lives at pixel i).
        const stateUv = new Float32Array(count * 2);
        for (let i = 0; i < count; i++) {
            const col = i % texSize;
            const row = Math.floor(i / texSize);
            stateUv[i * 2] = (col + 0.5) / texSize;
            stateUv[i * 2 + 1] = (row + 0.5) / texSize;
        }

        // Neighbor lookup texture: 6 x count, RG = neighbor state-UV, B = valid flag.
        const neighborData = new Float32Array(MAX_NEIGHBORS * count * 4);
        for (let i = 0; i < count; i++) {
            const list = mesh.neighbors[i];
            for (let k = 0; k < MAX_NEIGHBORS; k++) {
                const base = (i * MAX_NEIGHBORS + k) * 4;
                if (k < list.length) {
                    const nIdx = list[k];
                    const col = nIdx % texSize;
                    const row = Math.floor(nIdx / texSize);
                    neighborData[base] = (col + 0.5) / texSize;
                    neighborData[base + 1] = (row + 0.5) / texSize;
                    neighborData[base + 2] = 1.0;
                }
            }
        }
        const neighborTex = new THREE.DataTexture(
            neighborData,
            MAX_NEIGHBORS,
            count,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        neighborTex.minFilter = THREE.NearestFilter;
        neighborTex.magFilter = THREE.NearestFilter;
        neighborTex.needsUpdate = true;

        // CPU-side seed texture, blitted into the targets on (re)seed.
        const seedData = new Float32Array(texSize * texSize * 4);
        const seedTex = new THREE.DataTexture(
            seedData,
            texSize,
            texSize,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        seedTex.minFilter = THREE.NearestFilter;
        seedTex.magFilter = THREE.NearestFilter;

        function fillSeed() {
            // A = 1 everywhere, B = 0, plus a few random blobs of B to kick things off.
            seedData.fill(0);
            for (let i = 0; i < count; i++) seedData[i * 4] = 1.0;
            const blobs = 16;
            for (let n = 0; n < blobs; n++) {
                const v = Math.floor(Math.random() * count);
                seedData[v * 4 + 1] = 1.0;
                for (const nb of mesh.neighbors[v]) {
                    seedData[nb * 4 + 1] = 1.0;
                }
            }
            seedTex.needsUpdate = true;
        }

        // --- Render targets for ping-pong state. ---
        function makeTarget() {
            return new THREE.WebGLRenderTarget(texSize, texSize, {
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                format: THREE.RGBAFormat,
                type: targetType,
                depthBuffer: false,
                stencilBuffer: false,
            });
        }
        const targets = [makeTarget(), makeTarget()];
        let src = 0;

        // --- Offscreen scene for the fullscreen sim / copy passes. ---
        const quadScene = new THREE.Scene();
        const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quadGeo = new THREE.PlaneGeometry(2, 2);

        const simMaterial = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: QUAD_VERT,
            fragmentShader: SIM_FRAG,
            uniforms: {
                uState: { value: null },
                uNeighbors: { value: neighborTex },
                uFeed: { value: paramsRef.current.feed },
                uKill: { value: paramsRef.current.kill },
                uDa: { value: paramsRef.current.dA },
                uDb: { value: paramsRef.current.dB },
                uDt: { value: 1.0 },
                uTexSize: { value: texSize },
                uCount: { value: count },
            },
        });
        const copyMaterial = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: QUAD_VERT,
            fragmentShader: COPY_FRAG,
            uniforms: { uSeed: { value: seedTex } },
        });
        const quad = new THREE.Mesh(quadGeo, simMaterial);
        quadScene.add(quad);

        function seed() {
            fillSeed();
            quad.material = copyMaterial;
            for (let i = 0; i < 2; i++) {
                renderer.setRenderTarget(targets[i]);
                renderer.render(quadScene, quadCamera);
            }
            renderer.setRenderTarget(null);
            quad.material = simMaterial;
            src = 0;
            needsSeedRef.current = false;
        }

        // --- Main scene: the icosphere. ---
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(mesh.positions, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(mesh.normals, 3));
        geometry.setAttribute("aStateUv", new THREE.BufferAttribute(stateUv, 2));
        geometry.setIndex(new THREE.BufferAttribute(mesh.indices, 1));

        const meshMaterial = new THREE.ShaderMaterial({
            glslVersion: THREE.GLSL3,
            vertexShader: MESH_VERT,
            fragmentShader: MESH_FRAG,
            uniforms: {
                uState: { value: targets[src].texture },
                uDisplace: { value: 0.06 },
            },
        });
        const sphere = new THREE.Mesh(geometry, meshMaterial);
        const group = new THREE.Group();
        group.add(sphere);

        const scene = new THREE.Scene();
        scene.add(group);
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 3);

        function resize() {
            const w = Math.max(1, canvas!.clientWidth);
            const h = Math.max(1, canvas!.clientHeight);
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        resize();
        seed();

        // --- Pointer drag-to-orbit with idle auto-spin. ---
        const drag = { active: false, lastX: 0, lastY: 0 };
        let lastInteraction = -Infinity;
        function onDown(e: PointerEvent) {
            drag.active = true;
            drag.lastX = e.clientX;
            drag.lastY = e.clientY;
            lastInteraction = performance.now();
            canvas!.setPointerCapture(e.pointerId);
        }
        function onMove(e: PointerEvent) {
            if (!drag.active) return;
            const dx = e.clientX - drag.lastX;
            const dy = e.clientY - drag.lastY;
            drag.lastX = e.clientX;
            drag.lastY = e.clientY;
            group.rotation.y += dx * 0.005;
            group.rotation.x += dy * 0.005;
            lastInteraction = performance.now();
        }
        function onUp() {
            drag.active = false;
            lastInteraction = performance.now();
        }
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointerleave", onUp);

        const ro = new ResizeObserver(() => resize());
        ro.observe(canvas);

        let raf = 0;
        let disposed = false;

        function frame() {
            if (disposed) return;
            if (needsSeedRef.current) seed();

            const p = paramsRef.current;
            simMaterial.uniforms.uFeed.value = p.feed;
            simMaterial.uniforms.uKill.value = p.kill;
            simMaterial.uniforms.uDa.value = p.dA;
            simMaterial.uniforms.uDb.value = p.dB;

            // Simulation ping-pong.
            for (let i = 0; i < ITERATIONS_PER_FRAME; i++) {
                const dst = 1 - src;
                simMaterial.uniforms.uState.value = targets[src].texture;
                renderer.setRenderTarget(targets[dst]);
                renderer.render(quadScene, quadCamera);
                src = dst;
            }
            renderer.setRenderTarget(null);

            // Idle auto-spin once the pointer has been still for a moment.
            if (!drag.active && performance.now() - lastInteraction > 250) {
                group.rotation.y += 0.0025;
            }

            meshMaterial.uniforms.uState.value = targets[src].texture;
            renderer.render(scene, camera);

            raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);

        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointerleave", onUp);
            targets.forEach((t) => t.dispose());
            neighborTex.dispose();
            seedTex.dispose();
            geometry.dispose();
            quadGeo.dispose();
            simMaterial.dispose();
            copyMaterial.dispose();
            meshMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    if (webglFailed) {
        return (
            <div
                className={className}
                style={{
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(114,40,140,0.6), rgba(8,5,23,1) 70%)",
                }}
            />
        );
    }

    return <canvas ref={canvasRef} className={className} style={{ touchAction: "none" }} />;
}

export default IcoReactionDiffusionCanvas;
