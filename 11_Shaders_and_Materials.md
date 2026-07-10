# 11_Shaders_and_Materials.md

# Systems & Endurance

## Shader & Material Engineering Specification

Version 1.0

> This document defines every material and shader used throughout the
> experience. Visual consistency is achieved by treating materials as
> reusable systems rather than isolated implementations.

------------------------------------------------------------------------

# 1. Objectives

Materials must communicate physicality while remaining performant.

Principles:

-   Physically plausible
-   Consistent lighting response
-   Minimal stylistic drift
-   Graceful degradation
-   Shared material library

------------------------------------------------------------------------

# 2. Material Library

Core materials:

-   Ink
-   Brushed Gold
-   Matte Paper
-   Frosted Glass
-   Ribbon Fabric
-   Particle
-   Terrain Points
-   UI Surface

No scene should create bespoke materials unless absolutely necessary.

------------------------------------------------------------------------

# 3. Ink Material

Used by:

-   Hero portrait
-   Handwritten annotations
-   Closing signature

Properties:

-   Deep blue (#3A86FF)
-   Slight opacity variation
-   Pressure-sensitive thickness
-   Tiny edge roughness
-   Optional animated noise

------------------------------------------------------------------------

# 4. Medal Material

Model:

PBR Metallic-Roughness

Parameters:

-   Metallic: 1.0
-   Roughness: 0.22--0.35
-   Radial brushed normal map
-   Fine scratch detail
-   Soft edge wear

Highlights should move naturally with camera rotation.

------------------------------------------------------------------------

# 5. Paper Material

Requirements:

-   Matte finish
-   Slight fibre texture
-   Rounded edges
-   Micro thickness
-   Subtle ambient occlusion

Never appear glossy.

------------------------------------------------------------------------

# 6. Glass Material

Used for project overlays.

Characteristics:

-   Frosted transmission
-   Low-opacity tint
-   Screen-space blur
-   Soft Fresnel edge
-   Minimal chromatic aberration

Avoid exaggerated refraction.

------------------------------------------------------------------------

# 7. Particle Material

Used for:

-   Portrait dissolve
-   Terrain
-   Runner
-   Transition effects

Requirements:

-   GPU instanced
-   Circular sprite
-   Soft alpha falloff
-   Distance fade
-   Lighting-aware where appropriate

------------------------------------------------------------------------

# 8. Terrain Shader

Vertex Stage

-   Height displacement
-   Procedural wave animation
-   Scroll-driven amplitude

Fragment Stage

-   Atmospheric depth
-   Horizon fade
-   Blue-white gradient
-   Fog integration

------------------------------------------------------------------------

# 9. Noise Functions

Preferred:

-   Simplex Noise
-   FBM
-   Curl Noise (for particles)

Avoid expensive per-fragment calculations unless visually necessary.

------------------------------------------------------------------------

# 10. Uniform Standards

Typical uniforms:

-   uTime
-   uScroll
-   uVelocity
-   uResolution
-   uMouse
-   uProgress
-   uQuality

Uniform names should remain consistent across shaders.

------------------------------------------------------------------------

# 11. Performance

Rules:

-   Reuse shader programs
-   Minimize branching
-   Prefer vertex work over fragment work
-   Avoid unnecessary transparency
-   Batch materials where possible

------------------------------------------------------------------------

# 12. Fallback Strategy

If custom shaders are unavailable:

-   Replace with MeshStandardMaterial
-   Preserve silhouette
-   Preserve hierarchy
-   Maintain narrative continuity

------------------------------------------------------------------------

# 13. Acceptance Criteria

Every material should be immediately recognizable and reusable across
chapters without visual inconsistency. Shader complexity must always
justify its rendering cost.
