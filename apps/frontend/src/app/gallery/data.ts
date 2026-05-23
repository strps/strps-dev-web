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
    priority: 'high',
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
  {
    id: 'ascii-studio',
    slug: 'ascii-studio',
    title: 'ASCII Studio',
    description:
      'A drag-and-drop ASCII art editor with palettes, brushes, and an export pipeline that produces clean monospace renders.',
    category: 'art',
    tags: ['Canvas', 'Typography'],
    href: '/gallery/ascii-studio',
    year: 2024,
    priority: 'medium',
  },
  {
    id: 'latency-lab',
    slug: 'latency-lab',
    title: 'Latency Lab',
    description:
      'A small bench for measuring end-to-end latency across queues, protocols, and serialization formats. Outputs CSV and pretty charts.',
    category: 'experiment',
    tags: ['Networking', 'Benchmarks'],
    href: '/gallery/latency-lab',
    year: 2024,
    priority: 'medium',
  },
  {
    id: 'plant-watering-bot',
    slug: 'plant-watering-bot',
    title: 'Plant Watering Bot',
    description:
      'A capacitive moisture sensor and a peristaltic pump on a tiny board. Keeps my basil alive most weeks.',
    category: 'experiment',
    tags: ['Hardware', 'IoT'],
    href: '/gallery/plant-watering-bot',
    year: 2023,
    priority: 'low',
  },
  {
    id: 'color-field-cards',
    slug: 'color-field-cards',
    title: 'Color Field Cards',
    description:
      'A daily series of generative gradients, printed and pinned to a board next to my desk.',
    category: 'art',
    tags: ['Generative', 'Color'],
    href: '/gallery/color-field-cards',
    year: 2024,
    priority: 'low',
  },
  {
    id: 'recipe-box',
    slug: 'recipe-box',
    title: 'Recipe Box',
    description:
      'A no-fuss recipe manager that I actually use. Markdown-first, with a small parser for ingredient scaling.',
    category: 'project',
    tags: ['React', 'Markdown'],
    href: '/gallery/recipe-box',
    year: 2023,
    priority: 'low',
  },
  {
    id: 'type-specimen',
    slug: 'type-specimen',
    title: 'Type Specimen',
    description:
      'A specimen sheet generator for variable fonts. Pick a font, get a printable PDF.',
    category: 'art',
    tags: ['Typography', 'PDF'],
    href: '/gallery/type-specimen',
    year: 2025,
    priority: 'low',
  },
  {
    id: 'pi-cluster-dashboard',
    slug: 'pi-cluster-dashboard',
    title: 'Pi Cluster Dashboard',
    description:
      'A small dashboard for the four-node Raspberry Pi cluster under my desk. Temperatures, load, and a button to gracefully shut everything down.',
    category: 'experiment',
    tags: ['Homelab', 'Dashboard'],
    href: '/gallery/pi-cluster-dashboard',
    year: 2024,
    priority: 'low',
  },
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export function getGalleryItem(slug: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.slug === slug);
}
