import type { GalleryItem } from './types';
import svgCirclesImage from './(items)/svg-circles/svg-circles.png';
import reactionSphereImage from './(items)/reaction-sphere/reaction-sphere.png';
import grayScottImage from './(items)/gray-scott/gray-scott.png';
import imageToSvgImage from './(items)/image-to-svg/image-to-svg.svg';

export const galleryItems: GalleryItem[] = [
  {
    id: 'svg-circles',
    slug: 'svg-circles',
    title: 'Parallax Circles',
    description:
      'A pointer-following SVG composition. Concentric rings shift on a per-layer parallax factor while each ring slowly counter-rotates on its own clock.',
    category: 'experiment',
    tags: ['SVG', 'Motion', 'Parallax', 'Interactive'],
    imageUrl: svgCirclesImage,
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
    imageUrl: grayScottImage,
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
    imageUrl: reactionSphereImage,
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
    imageUrl: imageToSvgImage,
    href: '/gallery/image-to-svg',
    year: 2026,
    priority: 'high',
  },
];

export function getGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export function getGalleryItem(slug: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.slug === slug);
}
