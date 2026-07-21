import type { StaticImageData } from 'next/image';

export type GalleryCategory = 'art' | 'experiment' | 'project';

export type GalleryPriority = 'high' | 'medium' | 'low';

export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GalleryCategory;
  tags?: string[];
  imageUrl?: string | StaticImageData;
  href: string;
  year?: number;
  /**
   * Visual weight in the gallery grid. Controls card size.
   * Defaults to 'low' when omitted.
   */
  priority?: GalleryPriority;
}

export const GALLERY_CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: 'project', label: 'Projects' },
  { value: 'experiment', label: 'Experiments' },
  { value: 'art', label: 'Art' },
];
