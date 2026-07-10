# Project-Scoped Rules

## WebGL & DOM Overlays
- When converting a DOM-only section to include 3D WebGL elements, ALWAYS verify that the HTML container's CSS is updated to `background: transparent;`. Otherwise, the opaque HTML background will hide the fixed WebGL canvas beneath it.
- Ensure text contrast is updated if the background transitions from a light HTML background to a dark WebGL/global background.

## Vite HMR & Blank Screens
- If a user reports a "blank screen" or "white screen" immediately after large-scale class rewrites or structural changes, first advise them to perform a hard refresh (`Ctrl + Shift + R`), as Vite HMR frequently drops state on massive class replacements.
