/**
 * Plain stylesheet imports.
 *
 * Next compiles `import "…/x.css"` at build time, but TypeScript has no type for
 * a stylesheet and `next/types/global.d.ts` only declares `*.module.css` — the
 * one CSS import that carries a *value* (the class-name map). A global
 * stylesheet is imported for its side effect alone, so it goes undeclared and
 * every such import is an error under `moduleResolution: "bundler"`.
 *
 * The body is deliberately empty rather than absent: a bodiless `declare module
 * "*.css"` types the module as `any`, which would also swallow `import styles
 * from "./x.module.css"` should this pattern ever win over Next's more specific
 * one. With no exports declared, a side-effect import type-checks and a default
 * import still tells you it is wrong.
 */
declare module "*.css" {}
