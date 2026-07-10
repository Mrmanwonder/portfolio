# 08_Vault.md

# Systems & Endurance

## Chapter 04 --- Vault

### Archives & Credentials Experience Specification

Version 1.0

> The Vault transforms static certificates and letters of recommendation
> into an interactive archive. The visitor should feel as though they
> are browsing a curated museum collection rather than opening PDF
> files.

------------------------------------------------------------------------

# 1. Narrative Purpose

The Vault answers:

**"Can these claims be verified?"**

This chapter builds trust through evidence while maintaining the
cinematic language established by previous chapters.

------------------------------------------------------------------------

# 2. Visual Identity

Environment: - Infinite charcoal-black space - Subtle volumetric haze -
Minimal distractions - Floating horizontal archive cylinder

Mood: - Quiet - Professional - Museum-like - Timeless

------------------------------------------------------------------------

# 3. Cylinder Geometry

The archive consists of equally spaced document planes wrapped around a
horizontal cylinder.

Recommended values:

-   Radius: 400--700 px
-   8--24 documents
-   Uniform angular spacing
-   Constant document size
-   Invisible central axis

No document should intersect another.

------------------------------------------------------------------------

# 4. Document Construction

Each document is a textured plane with:

-   Paper thickness
-   Rounded corners
-   Slight page curl
-   High-resolution scan
-   Soft shadow
-   Edge bevel

Supported types:

-   Letters of Recommendation
-   Certificates
-   Medals (optional inserts)
-   Diplomas
-   Awards

------------------------------------------------------------------------

# 5. Motion

Idle:

-   Slow continuous rotation
-   Tiny vertical drift
-   Gentle breathing motion

Scroll:

-   Controls angular velocity
-   Rotation possesses inertia
-   Velocity decays naturally after scrolling stops

------------------------------------------------------------------------

# 6. Focus Behaviour

When a document reaches the front:

-   Rotation slows
-   Camera subtly advances
-   Local lighting increases
-   Title fades in
-   Metadata becomes readable

Hover:

-   Small elevation
-   Slight tilt
-   Increased shadow
-   Reflection shift

Click (optional):

-   Opens a high-resolution viewer
-   Background softens
-   Escape returns to cylinder

------------------------------------------------------------------------

# 7. Lighting

Primary key light:

-   Upper left

Fill light:

-   Low intensity

Rim light:

-   Very subtle blue

Paper should remain matte while protective sleeves may exhibit faint
reflections.

------------------------------------------------------------------------

# 8. Asset Strategy

Documents load progressively.

Only nearby documents maintain full-resolution textures.

Distant items use reduced-resolution mip levels.

------------------------------------------------------------------------

# 9. Accessibility

Reduced Motion:

-   Static cylinder
-   Arrow/button navigation
-   Crossfade between documents
-   Keyboard accessible

Every document must have descriptive alt text.

------------------------------------------------------------------------

# 10. Performance

Target: - 60 FPS desktop

Optimizations:

-   Texture atlases where possible
-   Frustum culling
-   Lazy loading
-   GPU-friendly transforms
-   Avoid unnecessary transparency

------------------------------------------------------------------------

# 11. Transition to Endurance

The final visible document gradually dissolves into a trail of blue
particles.

Those particles extend into a winding path which becomes the marathon
route in the next chapter, preserving visual continuity.

------------------------------------------------------------------------

# 12. Acceptance Criteria

Visitors should perceive the Vault as:

-   trustworthy
-   elegant
-   premium
-   interactive

The archive should encourage exploration while never interrupting the
narrative flow of the portfolio.
