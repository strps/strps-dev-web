# Creating Gallery Items

This guide explains how to add a new piece to the gallery. Each item is a
self-contained page living under the `(items)` route group, plus one entry in
the shared registry (`data.ts`).

## Anatomy

```
app/gallery/
├── data.ts                     # the registry — every item is listed here
├── types.ts                    # GalleryItem shape + categories
├── page.tsx                    # the gallery index (renders the grid)
└── (items)/
    └── your-slug/              # one folder per item, named after its slug
        ├── page.tsx            # the item's route (required)
        ├── YourSlugHero.tsx    # optional — interactive hero ("use client")
        └── YourSlugCanvas.tsx  # optional — the canvas / engine ("use client")
```

`(items)` is a [Next.js route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups):
the parentheses keep these folders out of the URL. An item at
`(items)/gray-scott/page.tsx` is served at `/gallery/gray-scott`.

## Step 1 — Register the item in `data.ts`

Add an object to the `galleryItems` array. This is what makes the card appear on
the gallery index and is the single source of truth for the item's metadata.

```ts
{
  id: 'your-slug',
  slug: 'your-slug',
  title: 'Your Title',
  description:
    'One or two punchy sentences. Shown on the gallery card — lead with what it is and what makes it interesting.',
  category: 'experiment',            // 'art' | 'experiment' | 'project'
  tags: ['WebGL', 'Interactive'],    // optional, free-form
  href: '/gallery/your-slug',        // always /gallery/<slug>
  year: 2026,
  priority: 'high',                  // 'high' | 'medium' | 'low' — controls card size
},
```

Field reference (see [`types.ts`](./types.ts) for the canonical type):

| Field         | Required | Notes                                                          |
| ------------- | -------- | -------------------------------------------------------------- |
| `id`          | yes      | Unique. Conventionally identical to `slug`.                    |
| `slug`        | yes      | URL segment. Must match the `(items)/<slug>` folder name.      |
| `title`       | yes      | Display name.                                                  |
| `description` | yes      | Card copy. Keep it to a sentence or two.                       |
| `category`    | yes      | One of `art`, `experiment`, `project` (drives the filter UI).  |
| `tags`        | no       | Strings shown as chips.                                        |
| `imageUrl`    | no       | Optional thumbnail; cards work without one.                    |
| `href`        | yes      | `/gallery/<slug>`.                                             |
| `year`        | no       | Shown on the card / hero badges.                               |
| `priority`    | no       | Visual weight in the grid. Defaults to `low` when omitted.     |

## Step 2 — Create the page

Make `(items)/your-slug/page.tsx`. Every item page exports `metadata` and a
default React component. Two shapes are common, pick based on whether the piece
is interactive.

### A. Static / write-up page

For items that are mostly prose (e.g. a hardware build, or a finished project),
keep everything in `page.tsx`. Follow the [`generative-tiles`](./(items)/generative-tiles/page.tsx)
pattern:

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Your Title | Gallery | Cesar Jerez",
    description: "Same one-liner you used in data.ts, roughly.",
};

export default function YourSlugPage() {
    return (
        <main className="min-h-screen">
            <Section
                className="relative py-24 md:py-32 overflow-hidden"
                containerClassName="container mx-auto px-4"
            >
                <div className="relative z-10 max-w-3xl space-y-6">
                    <Button asChild variant="ghost" size="sm" className="-ml-3">
                        <Link href="/gallery" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to gallery
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Art</Badge>
                        <Badge variant="secondary">2026</Badge>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        Your <span className="text-primary">Title</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Intro paragraph.
                    </p>
                </div>
            </Section>

            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-12">
                {/* write-up sections: "The idea", "How it works", "What I learned", etc. */}
            </Section>
        </main>
    );
}
```

### B. Interactive page (hero + canvas)

For live/interactive pieces, split into three files so the page stays a Server
Component and only the interactive parts are client components. Follow the
[`gray-scott`](./(items)/gray-scott/page.tsx) pattern:

**`page.tsx`** — server component, owns `metadata`, renders the hero then the
explanatory write-up:

```tsx
import Section from "@/components/section";
import { YourSlugHero } from "./YourSlugHero";

export const metadata = {
    title: "Your Title | Gallery | Cesar Jerez",
    description: "...",
};

export default function YourSlugPage() {
    return (
        <main className="min-h-screen">
            <YourSlugHero />
            <Section className="py-16" containerClassName="container mx-auto px-4 max-w-3xl space-y-10">
                {/* "How it works" write-up sections */}
            </Section>
        </main>
    );
}
```

**`YourSlugHero.tsx`** — `"use client"`. A full-bleed hero that mounts the
canvas, overlays any controls, and carries the title/badges/back-link. It owns
the interactive state (sliders, presets) and passes it down to the canvas as
props.

**`YourSlugCanvas.tsx`** — `"use client"`. The actual engine (WebGL / Three.js /
2D canvas / WebAudio). Takes a typed props interface for its parameters and a
`className`. Keep it presentation-agnostic: it receives values, it does not own
the UI. See [`GrayScottCanvas.tsx`](./(items)/gray-scott/GrayScottCanvas.tsx)
for the WebGL ping-pong pattern, or [`reaction-sphere`](./(items)/reaction-sphere/)
for a Three.js example.

## Conventions & shared building blocks

- **`"use client"`** goes only on files that need state, effects, or the DOM
  (heroes and canvases). Keep `page.tsx` a server component so `metadata` works.
- **Back link** — every item page has a "Back to gallery" `Button` linking to
  `/gallery` with an `ArrowLeft` icon.
- **Badges** — use `<Badge>` for the category, `variant="secondary"` for the
  year, `variant="outline"` for tech tags. Mirror the values you put in `data.ts`.
- **Layout** — wrap prose sections in `Section` with
  `containerClassName="container mx-auto px-4 max-w-3xl ..."`. Body copy uses
  `text-muted-foreground leading-relaxed`; emphasis uses
  `<strong className="text-foreground">`; inline code uses
  `<code className="px-1.5 py-0.5 rounded bg-muted text-xs">`.
- **UI primitives** live in `@/components/ui/*` (`Badge`, `Button`,
  `VerticalSlider`, …). Reuse them instead of hand-rolling controls.
- **Icons** come from `lucide-react`.
- **Credit your sources** — if the piece builds on someone's tutorial or paper,
  add a "Thanks" section with a link (see the bottom of the Gray-Scott page).

### Sub-strategies / supporting files

If an item has multiple variants or a meaty algorithm, give it its own
sub-folder of helpers. [`image-to-svg`](./(items)/image-to-svg/) keeps a
`strategies/` directory (with per-strategy notes like `HILBERT.md`), and
`reaction-sphere` ships an `icosphere.ts` mesh helper alongside the canvas.
Co-locate these inside the item folder — only `data.ts` is shared.

## Checklist

- [ ] Folder `(items)/<slug>/` created, name matches `slug`.
- [ ] `page.tsx` exports `metadata` and a default component.
- [ ] Interactive pieces split client code into `*Hero.tsx` / `*Canvas.tsx`.
- [ ] Entry added to `galleryItems` in `data.ts` with `href: '/gallery/<slug>'`.
- [ ] Back-to-gallery link, badges, and title present.
- [ ] Visited `/gallery` (card shows) and `/gallery/<slug>` (page renders).
```
