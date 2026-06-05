// Object lib owned by the svg-editor: the producer model + document compositor,
// also consumed by the image-to-svg / text-to-svg routes.

export * from "./types";
export { defaultTextSource, renderTextObject, textControls } from "./text";
export { defaultImageSource, renderImageObject, imageControls, prepareImageInput } from "./image";
export { composeDocument, objectGroup, wrapWorkingSvg } from "./document";
