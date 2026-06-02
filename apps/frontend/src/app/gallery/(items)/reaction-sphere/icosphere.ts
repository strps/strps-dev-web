// Generates a unique-vertex, indexed icosphere along with a per-vertex neighbor
// adjacency list. Three's built-in IcosahedronGeometry duplicates vertices per
// face, which makes neighbor lookups impossible — so we build our own, sharing
// every edge midpoint between the two faces that touch it.
//
// This is precomputed exactly once when the experiment mounts; only the
// per-vertex chemical state changes afterwards.

export interface IcosphereData {
    /** Unit-sphere vertex positions, 3 floats per vertex. */
    positions: Float32Array;
    /** Per-vertex normals — identical to positions on a unit sphere. */
    normals: Float32Array;
    /** Triangle indices into the vertex arrays. */
    indices: Uint32Array;
    /** neighbors[i] = list of vertex indices adjacent to vertex i (5 or 6). */
    neighbors: number[][];
    /** Total vertex count. */
    count: number;
}

type V3 = [number, number, number];

function normalize([x, y, z]: V3): V3 {
    const len = Math.hypot(x, y, z) || 1;
    return [x / len, y / len, z / len];
}

// The 12 vertices and 20 faces of a regular icosahedron.
function baseIcosahedron(): { verts: V3[]; faces: [number, number, number][] } {
    const t = (1 + Math.sqrt(5)) / 2;
    const verts: V3[] = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ].map((v) => normalize(v as V3));

    const faces: [number, number, number][] = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];
    return { verts, faces };
}

/**
 * Build a subdivided icosphere with shared (deduplicated) vertices and an
 * adjacency list. `subdivisions` of 5 yields 10 242 vertices.
 */
export function buildIcosphere(subdivisions = 5): IcosphereData {
    const { verts: baseVerts, faces: baseFaces } = baseIcosahedron();

    const verts: V3[] = baseVerts.slice();
    // Cache of edge-midpoint vertices, keyed by the sorted endpoint pair, so an
    // edge shared by two triangles produces a single midpoint vertex.
    const midpointCache = new Map<string, number>();

    function midpoint(a: number, b: number): number {
        const key = a < b ? `${a}_${b}` : `${b}_${a}`;
        const cached = midpointCache.get(key);
        if (cached !== undefined) return cached;
        const va = verts[a];
        const vb = verts[b];
        const mid = normalize([
            (va[0] + vb[0]) / 2,
            (va[1] + vb[1]) / 2,
            (va[2] + vb[2]) / 2,
        ]);
        const index = verts.length;
        verts.push(mid);
        midpointCache.set(key, index);
        return index;
    }

    let faces = baseFaces;
    for (let s = 0; s < subdivisions; s++) {
        const next: [number, number, number][] = [];
        for (const [a, b, c] of faces) {
            const ab = midpoint(a, b);
            const bc = midpoint(b, c);
            const ca = midpoint(c, a);
            next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
        }
        faces = next;
    }

    const count = verts.length;

    // Adjacency: walk every triangle edge and record the connection both ways.
    const neighborSets: Set<number>[] = Array.from({ length: count }, () => new Set<number>());
    for (const [a, b, c] of faces) {
        neighborSets[a].add(b).add(c);
        neighborSets[b].add(a).add(c);
        neighborSets[c].add(a).add(b);
    }
    const neighbors = neighborSets.map((set) => Array.from(set));

    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const [x, y, z] = verts[i];
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        normals[i * 3] = x;
        normals[i * 3 + 1] = y;
        normals[i * 3 + 2] = z;
    }

    const indices = new Uint32Array(faces.length * 3);
    for (let f = 0; f < faces.length; f++) {
        indices[f * 3] = faces[f][0];
        indices[f * 3 + 1] = faces[f][1];
        indices[f * 3 + 2] = faces[f][2];
    }

    return { positions, normals, indices, neighbors, count };
}
