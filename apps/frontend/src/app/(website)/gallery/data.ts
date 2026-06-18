import type { GalleryItem } from './types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'generative-tiles',
    slug: 'generative-tiles',
    title: 'Generative Tiles',
    description:
      'An infinite SVG mosaic that rearranges itself on every visit. Built from a handful of primitive shapes and a deterministic noise field.',
    category: 'art',
    tags: ['SVG', 'Generative', 'Animation'],
    href: '/gallery/generative-tiles',
    year: 2025,
    priority: 'low',
  },
  {
    id: 'led-matrix-clock',
    slug: 'led-matrix-clock',
    title: 'LED Matrix Clock',
    description:
      'A 32x32 RGB matrix driven by an ESP32, pulling time over NTP and weather over MQTT. The PCB and enclosure were designed from scratch.',
    category: 'experiment',
    tags: ['ESP32', 'Hardware', 'IoT'],
    href: '/gallery/led-matrix-clock',
    year: 2024,
    priority: 'high',
  },
  {
    id: 'svg-circles',
    slug: 'svg-circles',
    title: 'Parallax Circles',
    description:
      'A pointer-following SVG composition. Concentric rings shift on a per-layer parallax factor while each ring slowly counter-rotates on its own clock.',
    category: 'experiment',
    tags: ['SVG', 'Motion', 'Parallax', 'Interactive'],
    href: '/gallery/svg-circles',
    year: 2025,
    priority: 'high',
  },
  {
    id: 'gray-scott',
    slug: 'gray-scott',
    title: 'Gray-Scott',
    description:
      'A live reaction-diffusion field running on the GPU. Two virtual chemicals feed, react, and diffuse into coral, maze, and mitosis patterns you can paint into.',
    category: 'experiment',
    tags: ['WebGL', 'Simulation', 'Generative', 'Interactive'],
    href: '/gallery/gray-scott',
    year: 2025,
    priority: 'high',
  },
  {
    id: 'reaction-sphere',
    slug: 'reaction-sphere',
    title: 'Reaction Sphere',
    description:
      'Gray-Scott reaction-diffusion running across the surface of an icosphere. Each vertex reacts and diffuses with its mesh neighbors on the GPU, in 3D you can spin.',
    category: 'experiment',
    tags: ['WebGL', 'Three.js', 'Simulation', '3D'],
    href: '/gallery/reaction-sphere',
    year: 2026,
    priority: 'high',
  },
  {
    id: 'image-to-svg',
    slug: 'image-to-svg',
    title: 'Image to SVG',
    description:
      'Turn any image into vector line art. The first converter renders classic engraving-style hatching and cross-hatching, with more strategies to come.',
    category: 'experiment',
    tags: ['SVG', 'Image', 'Halftone', 'Interactive'],
    href: '/gallery/image-to-svg',
    year: 2026,
    priority: 'high',
  },
  {
    id: 'synth-keys',
    slug: 'synth-keys',
    title: 'Synth Keys',
    description:
      'A polyphonic web synthesizer playable from your keyboard. WebAudio under the hood, with modulation routing exposed as a small visual patchbay.',
    category: 'project',
    tags: ['WebAudio', 'React', 'Music'],
    href: '/gallery/synth-keys',
    year: 2025,
    priority: 'medium',
  },
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export function getGalleryItem(slug: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.slug === slug);
}
