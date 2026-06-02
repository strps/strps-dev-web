"use client";

import { useEffect, useRef, useState } from "react";

export interface GrayScottParams {
    feed: number;
    kill: number;
    dA: number;
    dB: number;
}

export interface GrayScottCanvasProps extends GrayScottParams {
    /** Change this value to re-seed the field (e.g. on preset change or reset). */
    seedKey: number;
    className?: string;
}

// Full-screen triangle generated from gl_VertexID — no vertex buffer needed.
const VERT = `#version 300 es
void main() {
    vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

// Gray-Scott update. Chemical A in .x, chemical B in .y, both in [0,1].
const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;       // 1 / resolution
uniform float uFeed;
uniform float uKill;
uniform float uDa;
uniform float uDb;
uniform float uDt;
uniform vec2 uBrush;       // brush center in uv
uniform float uBrushR;     // brush radius in uv
uniform float uBrushOn;    // 0 or 1
out vec4 outColor;

vec2 sampleAt(vec2 uv) {
    return texture(uState, uv).xy;
}

void main() {
    vec2 uv = gl_FragCoord.xy * uTexel;

    // 3x3 Laplacian with the classic Gray-Scott weights.
    vec2 lap = vec2(0.0);
    lap += sampleAt(uv + vec2(-uTexel.x, -uTexel.y)) * 0.05;
    lap += sampleAt(uv + vec2(0.0, -uTexel.y)) * 0.2;
    lap += sampleAt(uv + vec2(uTexel.x, -uTexel.y)) * 0.05;
    lap += sampleAt(uv + vec2(-uTexel.x, 0.0)) * 0.2;
    lap += sampleAt(uv) * -1.0;
    lap += sampleAt(uv + vec2(uTexel.x, 0.0)) * 0.2;
    lap += sampleAt(uv + vec2(-uTexel.x, uTexel.y)) * 0.05;
    lap += sampleAt(uv + vec2(0.0, uTexel.y)) * 0.2;
    lap += sampleAt(uv + vec2(uTexel.x, uTexel.y)) * 0.05;

    vec2 s = sampleAt(uv);
    float a = s.x;
    float b = s.y;
    float reaction = a * b * b;

    float da = a + (uDa * lap.x - reaction + uFeed * (1.0 - a)) * uDt;
    float db = b + (uDb * lap.y + reaction - (uKill + uFeed) * b) * uDt;

    // Paint chemical B under the brush.
    if (uBrushOn > 0.5) {
        vec2 d = uv - uBrush;
        d.x *= uTexel.y / uTexel.x; // correct for aspect so the brush is round
        if (length(d) < uBrushR) {
            db = 1.0;
        }
    }

    outColor = vec4(clamp(da, 0.0, 1.0), clamp(db, 0.0, 1.0), 0.0, 1.0);
}`;

// Map chemical B to a color ramp.
const DISPLAY_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
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
    vec2 uv = gl_FragCoord.xy * uTexel;
    vec2 s = texture(uState, uv).xy;
    float v = clamp((s.x - s.y) * 1.2, 0.0, 1.0);
    outColor = vec4(ramp(1.0 - v), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compile error: ${log}`);
    }
    return shader;
}

function link(gl: WebGL2RenderingContext, vert: WebGLShader, frag: WebGLShader) {
    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Program link error: ${log}`);
    }
    return program;
}

const ITERATIONS_PER_FRAME = 12;

export function GrayScottCanvas({ feed, kill, dA, dB, seedKey, className }: GrayScottCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [webglFailed, setWebglFailed] = useState(false);

    // Live params read by the render loop without re-creating it.
    const paramsRef = useRef<GrayScottParams>({ feed, kill, dA, dB });
    const seedRef = useRef(seedKey);
    const needsSeedRef = useRef(true);
    const brushRef = useRef({ x: 0.5, y: 0.5, on: false });

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

        const gl = canvas.getContext("webgl2", { antialias: false, depth: false });
        if (!gl) {
            setWebglFailed(true);
            return;
        }

        let disposed = false;
        let raf = 0;

        // Prefer 16-bit float render targets when available, else fall back to bytes.
        const floatExt = gl.getExtension("EXT_color_buffer_float");
        const internalFormat = floatExt ? gl.RGBA16F : gl.RGBA8;
        const texType = floatExt ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE;

        const simVert = compile(gl, gl.VERTEX_SHADER, VERT);
        const simFrag = compile(gl, gl.FRAGMENT_SHADER, SIM_FRAG);
        const dispFrag = compile(gl, gl.FRAGMENT_SHADER, DISPLAY_FRAG);
        const simProgram = link(gl, simVert, simFrag);
        const dispProgram = link(gl, simVert, dispFrag);

        const vao = gl.createVertexArray();

        let width = 0;
        let height = 0;
        const textures: WebGLTexture[] = [];
        const framebuffers: WebGLFramebuffer[] = [];
        let src = 0;

        function makeTexture(): WebGLTexture {
            const tex = gl!.createTexture()!;
            gl!.bindTexture(gl!.TEXTURE_2D, tex);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
            gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
            return tex;
        }

        function seed() {
            // A = 1 everywhere, B = 0, with a few random blobs of B to kick things off.
            const count = width * height;
            const data = new Float32Array(count * 4);
            for (let i = 0; i < count; i++) {
                data[i * 4] = 1.0;
            }
            const blobs = 14;
            for (let n = 0; n < blobs; n++) {
                const cx = Math.floor(Math.random() * width);
                const cy = Math.floor(Math.random() * height);
                const r = 4 + Math.floor(Math.random() * 8);
                for (let y = -r; y <= r; y++) {
                    for (let x = -r; x <= r; x++) {
                        if (x * x + y * y > r * r) continue;
                        const px = cx + x;
                        const py = cy + y;
                        if (px < 0 || px >= width || py < 0 || py >= height) continue;
                        const idx = (py * width + px) * 4;
                        data[idx + 1] = 1.0;
                    }
                }
            }

            // Upload as float, or convert to bytes when float targets are unavailable.
            let pixels: ArrayBufferView;
            if (floatExt) {
                pixels = data;
            } else {
                const bytes = new Uint8Array(count * 4);
                for (let i = 0; i < count * 4; i++) {
                    bytes[i] = Math.round(data[i] * 255);
                }
                pixels = bytes;
            }
            const uploadType = floatExt ? gl!.FLOAT : gl!.UNSIGNED_BYTE;
            for (let i = 0; i < 2; i++) {
                gl!.bindTexture(gl!.TEXTURE_2D, textures[i]);
                gl!.texImage2D(
                    gl!.TEXTURE_2D,
                    0,
                    internalFormat,
                    width,
                    height,
                    0,
                    gl!.RGBA,
                    i === 0 ? uploadType : texType,
                    i === 0 ? pixels : null
                );
            }
            src = 0;
            needsSeedRef.current = false;
        }

        function allocate() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const dispW = Math.max(1, Math.round(canvas!.clientWidth * dpr));
            const dispH = Math.max(1, Math.round(canvas!.clientHeight * dpr));
            canvas!.width = dispW;
            canvas!.height = dispH;

            // Simulation grid: capped for performance, aspect-preserving.
            const maxDim = 480;
            const aspect = dispW / dispH;
            if (aspect >= 1) {
                width = maxDim;
                height = Math.max(1, Math.round(maxDim / aspect));
            } else {
                height = maxDim;
                width = Math.max(1, Math.round(maxDim * aspect));
            }

            if (textures.length === 0) {
                textures.push(makeTexture(), makeTexture());
                framebuffers.push(gl!.createFramebuffer()!, gl!.createFramebuffer()!);
            }
            seed();
            for (let i = 0; i < 2; i++) {
                gl!.bindFramebuffer(gl!.FRAMEBUFFER, framebuffers[i]);
                gl!.framebufferTexture2D(
                    gl!.FRAMEBUFFER,
                    gl!.COLOR_ATTACHMENT0,
                    gl!.TEXTURE_2D,
                    textures[i],
                    0
                );
            }
            gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        }

        // Uniform locations.
        const u = {
            simState: gl.getUniformLocation(simProgram, "uState"),
            simTexel: gl.getUniformLocation(simProgram, "uTexel"),
            feed: gl.getUniformLocation(simProgram, "uFeed"),
            kill: gl.getUniformLocation(simProgram, "uKill"),
            da: gl.getUniformLocation(simProgram, "uDa"),
            db: gl.getUniformLocation(simProgram, "uDb"),
            dt: gl.getUniformLocation(simProgram, "uDt"),
            brush: gl.getUniformLocation(simProgram, "uBrush"),
            brushR: gl.getUniformLocation(simProgram, "uBrushR"),
            brushOn: gl.getUniformLocation(simProgram, "uBrushOn"),
            dispState: gl.getUniformLocation(dispProgram, "uState"),
            dispTexel: gl.getUniformLocation(dispProgram, "uTexel"),
        };

        allocate();

        function frame() {
            if (disposed || !gl) return;
            if (needsSeedRef.current) seed();

            const p = paramsRef.current;
            const brush = brushRef.current;

            gl.bindVertexArray(vao);
            gl.useProgram(simProgram);
            gl.uniform2f(u.simTexel, 1 / width, 1 / height);
            gl.uniform1f(u.feed, p.feed);
            gl.uniform1f(u.kill, p.kill);
            gl.uniform1f(u.da, p.dA);
            gl.uniform1f(u.db, p.dB);
            gl.uniform1f(u.dt, 1.0);
            gl.uniform2f(u.brush, brush.x, brush.y);
            gl.uniform1f(u.brushR, 0.03);
            gl.uniform1i(u.simState, 0);
            gl.viewport(0, 0, width, height);

            for (let i = 0; i < ITERATIONS_PER_FRAME; i++) {
                const dst = 1 - src;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[dst]);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, textures[src]);
                // Only paint on the first iteration of the frame so the splat is the right size.
                gl.uniform1f(u.brushOn, brush.on && i === 0 ? 1.0 : 0.0);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                src = dst;
            }

            // Display pass to the screen.
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(dispProgram);
            gl.viewport(0, 0, canvas!.width, canvas!.height);
            gl.uniform2f(u.dispTexel, 1 / canvas!.width, 1 / canvas!.height);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textures[src]);
            gl.uniform1i(u.dispState, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            raf = requestAnimationFrame(frame);
        }

        raf = requestAnimationFrame(frame);

        const ro = new ResizeObserver(() => {
            allocate();
        });
        ro.observe(canvas);

        // Pointer painting.
        function toUv(e: PointerEvent) {
            const rect = canvas!.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) / rect.width,
                y: 1 - (e.clientY - rect.top) / rect.height,
            };
        }
        function onDown(e: PointerEvent) {
            const uv = toUv(e);
            brushRef.current = { x: uv.x, y: uv.y, on: true };
            canvas!.setPointerCapture(e.pointerId);
        }
        function onMove(e: PointerEvent) {
            if (!brushRef.current.on) return;
            const uv = toUv(e);
            brushRef.current.x = uv.x;
            brushRef.current.y = uv.y;
        }
        function onUp() {
            brushRef.current.on = false;
        }
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointerleave", onUp);

        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointerleave", onUp);
            textures.forEach((t) => gl.deleteTexture(t));
            framebuffers.forEach((f) => gl.deleteFramebuffer(f));
            gl.deleteProgram(simProgram);
            gl.deleteProgram(dispProgram);
            gl.deleteShader(simVert);
            gl.deleteShader(simFrag);
            gl.deleteShader(dispFrag);
            if (vao) gl.deleteVertexArray(vao);
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

export default GrayScottCanvas;
