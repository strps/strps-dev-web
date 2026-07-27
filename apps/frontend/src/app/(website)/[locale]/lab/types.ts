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

/* ------------------------------------------------------------------ */
/* Localized per-item content (i18n)                                  */
/* ------------------------------------------------------------------ */

/**
 * The four gallery items that have their own detail page. Keys the
 * localized content maps in `./content/{en,es}.ts` — a compile error here
 * (or a missing entry there) is the guardrail against a half-translated item.
 */
export type LabSlug = 'svg-circles' | 'gray-scott' | 'reaction-sphere' | 'image-to-svg';

/**
 * One run of inline text. Plain strings carry copy; the object variants carry
 * the inline markup the narrative prose needs (`<code>`, `<strong>`, links) so
 * a translator can move a whole paragraph without the markup living in JSX.
 * `external: true` links open in a new tab and are left unprefixed; internal
 * links are run through `localizedHref()` at render time.
 */
export type RichSegment =
  | string
  | { code: string }
  | { strong: string }
  | { link: string; href: string; external?: boolean };

/** An ordered run of inline segments — one paragraph or one list item. */
export type RichText = RichSegment[];

/** A block inside a narrative section: a paragraph or a bulleted list. */
export type ContentBlock =
  | { type: 'p'; content: RichText }
  | { type: 'ul'; items: RichText[] };

/** One `<h2>`-headed section of below-the-hero prose. */
export interface LabSection {
  heading: string;
  /** Renders the top hairline + extra padding used by the "Thanks" sections. */
  topBorder?: boolean;
  blocks: ContentBlock[];
}

/**
 * Per-item micro-labels for the interactive control panel. Keyed by the same
 * stable slugs the hero components use (slider key, preset name, motion
 * pattern), so a hero can look a label up by the value it already has.
 */
export interface LabItemControls {
  sliders?: Record<string, string>;
  presets?: Record<string, string>;
  motion?: Record<string, string>;
}

/** The full localized content for one lab item's card, hero, and detail page. */
export interface LabItemContent {
  /** SEO title/description for the detail page's `generateMetadata`. */
  meta: { title: string; description: string };
  /** Gallery-card copy — overlays the structural entry in `./data.ts`. */
  card: { title: string; description: string; tags: string[] };
  hero: {
    /** Category badge, e.g. "Experiment". */
    categoryBadge: string;
    /** Tech badge, e.g. "WebGL" / "Interactive". */
    techBadge: string;
    /** Title text before the highlighted span. */
    titleLead: string;
    /** The `text-primary` highlighted portion of the title. */
    titleHighlight: string;
    lede: string;
    /** The single-line interaction hint under the lede. */
    hint: string;
  };
  controls?: LabItemControls;
  sections: LabSection[];
  /**
   * `svg-circles` only: the live "Variants" showcase copy. The interactive
   * SVG tiles stay in the page; only their surrounding text is localized here.
   */
  variants?: {
    heading: string;
    intro: RichText;
    tileLabels: string[];
  };
}
