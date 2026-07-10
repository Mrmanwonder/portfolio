# 10_ThreeJS_Rendering_Architecture.md

# Systems & Endurance

## Three.js Rendering Architecture

Version 1.0

> This document defines the rendering architecture for every
> WebGL-powered experience in the portfolio. It specifies how scenes are
> initialized, rendered, optimized, and gracefully degraded.

------------------------------------------------------------------------

# 1. Objectives

The rendering engine must:

-   Maintain a cinematic presentation.
-   Sustain 60 FPS on modern desktops.
-   Scale gracefully to lower-powered devices.
-   Isolate rendering from application logic.
-   Support future expansion without redesign.

------------------------------------------------------------------------

# 2. Rendering Pipeline

Boot Sequence

1.  Detect WebGL capabilities.
2.  Detect GPU tier.
3.  Determine quality preset.
4.  Initialize renderer.
5.  Initialize asset manager.
6.  Preload first scene.
7.  Begin render loop.

The renderer should never block first contentful paint.

------------------------------------------------------------------------

# 3. Renderer Configuration

Renderer: - Physically Correct Lighting: enabled - Output Color Space:
sRGB - Tone Mapping: ACES Filmic - Adaptive Pixel Ratio - Antialias
enabled when supported

Clamp pixel ratio to avoid unnecessary GPU cost.

------------------------------------------------------------------------

# 4. Scene Lifecycle

Every scene exposes:

-   preload()
-   create()
-   enter()
-   update(deltaTime)
-   resize()
-   suspend()
-   resume()
-   destroy()

Only one primary scene owns the render loop at a time.

------------------------------------------------------------------------

# 5. Camera Architecture

Use a Camera Manager.

Responsibilities:

-   Camera ownership
-   Cinematic interpolation
-   Scroll-driven movement
-   Focus targets
-   Shake controller
-   Pointer parallax
-   Responsive framing

Scenes request camera states rather than modifying the camera directly.

------------------------------------------------------------------------

# 6. Lighting

Recommended structure:

-   Hemisphere Light
-   Directional Key Light
-   Rim Light
-   Environment Map
-   Optional Accent Light

Avoid excessive light counts.

------------------------------------------------------------------------

# 7. Post Processing

Pipeline order:

Render

↓

Bloom (subtle)

↓

Depth of Field (scene dependent)

↓

Vignette (minimal)

↓

Color Grading

↓

Output

Disable expensive passes on lower quality tiers.

------------------------------------------------------------------------

# 8. Asset Management

Assets are categorized into:

-   Textures
-   HDRIs
-   Models
-   SVGs
-   Fonts
-   Audio

Implement:

-   lazy loading
-   caching
-   reference counting
-   automatic disposal

------------------------------------------------------------------------

# 9. GPU Optimization

Preferred techniques:

-   InstancedMesh
-   Texture atlases
-   Frustum culling
-   LOD
-   Dynamic resolution scaling

Avoid unnecessary material changes.

------------------------------------------------------------------------

# 10. Quality Tiers

Ultra

-   Full particles
-   Full post-processing
-   Maximum shadows

High

-   Reduced particles
-   Standard post-processing

Medium

-   Lower particle density
-   Reduced shadow resolution

Low

-   Simplified geometry
-   No bloom
-   Static reflections

------------------------------------------------------------------------

# 11. Error Recovery

If WebGL initialization fails:

-   Render semantic HTML version.
-   Preserve narrative.
-   Display static imagery where required.
-   Never present a blank screen.

------------------------------------------------------------------------

# 12. Debugging

Development mode should expose:

-   FPS counter
-   Draw calls
-   Geometry count
-   Texture memory
-   Active scene
-   Camera state
-   GPU tier

Debug UI must never ship to production.

------------------------------------------------------------------------

# 13. Performance Budgets

Desktop

-   \< 250 draw calls
-   \< 500 MB GPU memory
-   Stable 60 FPS

Mobile

-   Adaptive particle counts
-   Reduced texture resolution
-   Stable 30 FPS minimum

------------------------------------------------------------------------

# 14. Acceptance Criteria

The rendering architecture should support every chapter while remaining
modular, performant, and maintainable. New scenes should integrate
without changes to the renderer core, and users should experience smooth
transitions regardless of device capability.
