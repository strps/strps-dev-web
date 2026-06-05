# SVG Editor

A composition editor: place multiple **objects** — text paths and image line-art —
onto one **document** (a paper sheet), then move / scale / rotate them on a canvas
with interactive zoom and pan, and export the result as a single SVG suitable for
pen plotters / CNC.

This is a living document — extend it as the editor grows.

## Files

| File | Role |
|------|------|
| `page.tsx` | Owns document state, the object lifecycle, and the control panel. |
| `SvgEditorCanvas.tsx` | Interactive viewport: zoom/pan, selection, on-canvas handles. |
| `objects/` | Object model + producers + document compositor (see below). |

## The object lib (`objects/`)

The rendering core lives here and is also consumed by the `image-to-svg` and
`text-to-svg` routes (they import from `../svg-editor/objects`).

- **Producer model** — an *object producer* turns kind-specific source params into a
  `RenderedObject` (`{ markup, width, height, background }`): the inner SVG content in
  its own local px space `[0,0]→[w,h]`, **without** any paper wrapper.
  - `text/index.ts` — `renderTextObject(source)` (async; loads the font), `textControls`.
  - `image/index.ts` — `prepareImageInput(image)` (tone buffer) + `renderImageObject(input, source)`.
- **`document.ts`**
  - `composeDocument(doc)` — composes the whole document into a standalone SVG string
    (paper bg, each object as a transformed `<g>`, corner signature). Used for export.
  - `wrapWorkingSvg(rendered, bg?)` — wraps one producer's output back into the
    working-SVG shape the legacy routes feed to `applyLayout`.
- **`types.ts`** — `EditorDocument`, `PlacedObject`, `ObjectSource`, `ObjectTransform`,
  `RenderedObject`.

## Coordinate spaces

1. **Local px** — an object's own `[0,0]→[width,height]` content space (e.g. text at
   ~100px, images capped at 700px on the long edge).
2. **Document** — paper units (mm). A `PlacedObject.transform` maps local → document:
   `translate(x, y) rotate(rotation, centre) scale(scale)`. `x,y` is the top-left anchor;
   rotation is about the object centre. Paper dimensions come from
   `resolvePaper(paperId, landscape)` in `../image-to-svg/paper.ts`.
3. **Screen** — css px in the canvas. `screen = pan + document × viewScale`. The view
   transform lives only in the canvas; selection handles are drawn in screen space so
   they stay a constant size at any zoom.

## Interactions

- **Zoom** — scroll wheel, anchored at the cursor.
- **Pan** — drag empty canvas. **Double-click** — refit the sheet to the pane.
- **Select** — click an object (click empty space to deselect).
- **Move** — drag a selected object. **Scale** — drag a corner handle (about the centre).
  **Rotate** — drag the handle above the top edge.
- Two overlay panels: a left **Document** panel (paper/bg, add buttons, the object tree,
  export — toggle with `h`) and a right **Object** panel (per-kind params plus numeric
  `x/y/scale/rotation` and z-order for the selected object — toggle with `o`). The object
  tree lists objects in z-order (topmost first); click a row to select it.

## Adding a new object kind

1. Add a source type to `ObjectSource` in `objects/types.ts`.
2. Add a producer module under `objects/<kind>/` exporting `default<Kind>Source()`,
   `render<Kind>Object(...)` returning a `RenderedObject`, and its controls.
3. Re-export it from `objects/index.ts`.
4. Wire an "Add" button + a controls branch in `page.tsx`.

The compositor and canvas are kind-agnostic — they only consume `RenderedObject`.

## Known limitations / next steps

- No undo/redo or persistence yet.
- Scale is uniform (corner drag scales about the centre); no aspect-free / edge handles.
- Image objects keep their decoded tone buffer in memory for the session (not persisted).
- The corner signature is preview-only on canvas; `composeDocument` re-emits it on export.
