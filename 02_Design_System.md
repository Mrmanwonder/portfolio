# 02_Design_System.md

# Systems & Endurance

## Design System Specification

Version 1.0

> This document defines every reusable visual rule used across the
> portfolio. No component may introduce its own visual language outside
> this specification.

------------------------------------------------------------------------

# 1. Design Principles

The design system must communicate:

-   Precision
-   Confidence
-   Breathing room
-   Editorial quality
-   Engineering discipline

Interfaces should never resemble dashboards or admin panels.

------------------------------------------------------------------------

# 2. Color System

## Primary

  Token      Value     Usage
  ---------- --------- ------------------------
  White      #FFFFFF   Primary canvas
  Black      #000000   Immersive environments
  Charcoal   #111111   Transitional scenes
  Cerulean   #3A86FF   Signature accent

## Secondary

Soft Gray: #EAEAEA

Warm Gold: #D8A629

Ribbon Red: #8B1E24

Mist: rgba(255,255,255,.08)

Glass Dark: rgba(20,20,20,.30)

------------------------------------------------------------------------

# 3. Typography

Primary: Plus Jakarta Sans

Accent: Gochi Hand

Scale

Display XL: 9--12rem

Display: 6rem

H1: 4rem

H2: 3rem

H3: 2rem

Body Large: 1.25rem

Body: 1rem

Caption: .875rem

Maximum readable width: 70 characters.

------------------------------------------------------------------------

# 4. Spacing System

Base unit: 8px

Scale:

8

16

24

32

48

64

96

128

192

Never use arbitrary spacing.

------------------------------------------------------------------------

# 5. Grid

Desktop

12-column grid

Maximum width: 1600px

Content width: 1400px

Margins: 64px

Mobile

Single column

24px padding

------------------------------------------------------------------------

# 6. Border Radius

Cards: 24px

Images: 18px

Buttons: 999px

Panels: 32px

Avoid sharp corners.

------------------------------------------------------------------------

# 7. Shadows

Light Mode

Soft diffuse shadows.

Dark Mode

Ambient glow only.

No harsh drop shadows.

------------------------------------------------------------------------

# 8. Glass Material

Panels use:

Background blur

Low opacity

Soft border

Very subtle noise

Never use saturated transparency.

------------------------------------------------------------------------

# 9. Motion Tokens

Fast

120ms

Normal

300ms

Slow

600ms

Hero transitions

1000--1800ms

Physics-based motion preferred.

------------------------------------------------------------------------

# 10. Layering

Background

Terrain

Scene Objects

Interactive Objects

UI

Cursor

Debug

Every layer has a defined z-index token.

------------------------------------------------------------------------

# 11. Cursor

Default cursor hidden.

Custom cursor:

Outer ring

Inner dot

Elastic interpolation

Hover expands ring.

------------------------------------------------------------------------

# 12. Scrollbar

Minimal.

2--4px.

Accent blue thumb.

Fade when inactive.

------------------------------------------------------------------------

# 13. Imagery

No stock photography.

Project screenshots:

Rounded

High resolution

Shadowed

Perspective corrected

------------------------------------------------------------------------

# 14. Icons

Prefer vector line icons.

Uniform stroke width.

Never mix icon styles.

------------------------------------------------------------------------

# 15. Animation Standards

Objects never appear instantly.

Preferred sequence:

Opacity

Translation

Rotation

Scale

Secondary particles

Settling

------------------------------------------------------------------------

# 16. Responsive Rules

Desktop receives full cinematic experience.

Tablet:

Reduced particles.

Reduced shaders.

Mobile:

Simplified 3D.

Equivalent storytelling.

------------------------------------------------------------------------

# 17. Accessibility

Minimum contrast WCAG AA.

Reduced motion mode.

Keyboard focus visible.

Semantic HTML mandatory.

------------------------------------------------------------------------

# Acceptance Criteria

A newly created component should immediately feel native to the
portfolio without requiring custom styling beyond these tokens.
