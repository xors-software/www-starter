// Side-effect CSS imports in app/layout.tsx. TypeScript 7 reports unresolved
// side-effect imports (TS2882). Next's types also declare this, but only when
// they are loaded; this keeps `tsc` independent of that.
declare module "*.css"
