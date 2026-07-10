# Systems & Endurance --- Master Design Specification

> This document is the single source of truth for building the
> portfolio.

## Vision

This is **not** a conventional portfolio. It is an interactive cinematic
experience comparable to top Awwwards winners. Every section is a
chapter of a story, connected through motion, lighting, typography, and
a persistent blue visual motif.

## Design Principles

-   No traditional navigation bar.
-   Scroll is the timeline.
-   Every animation has weight, inertia and purpose.
-   Objects transition into the next chapter instead of hard scene cuts.
-   Premium motion, not gimmicks.
-   60 FPS target.
-   Desktop-first with graceful mobile adaptation.

## Global Design System

### Colors

-   White: #FFFFFF
-   Black: #000000
-   Charcoal: #111111
-   Accent: Cerulean Blue #3A86FF
-   Gold: physically based metallic material

### Typography

Primary: Plus Jakarta Sans Accent: Gochi Hand

### Global Motion

-   Lenis smooth scrolling
-   GSAP ScrollTrigger
-   Three.js + custom shaders
-   Motion follows spring physics
-   Camera is cinematic

## Chapter 1 --- Arrival

White canvas. A hand-drawn portrait made from hundreds of animated ink
splines draws itself. Micro animations: - blinking - breathing - subtle
smile Headline fades in: "I build systems." Handwritten annotation:
"...and run far."

The portrait dissolves into particles as scrolling begins.

## Chapter 2 --- Recognition

A realistic medal swings in on a ribbon.

The medal: - has inertia - casts shadows - twists naturally - reveals
achievements behind it - exits while still oscillating

Achievements are revealed as premium editorial layouts rather than
cards.

## Chapter 3 --- Creation

Background transitions to black.

Each project occupies an entire viewport.

Sequence: 1. Colored showcase panel enters. 2. Screens rise from inside
the panel. 3. Title appears behind devices. 4. Animated statistics. 5.
Technology orbit. 6. Interactive previews. 7. Camera exits into next
project.

Each project has its own visual identity.

## Chapter 4 --- Vault

A floating horizontal cylinder composed of recommendation letters and
certificates.

Documents: - slight curvature - paper thickness - shadows -
reflections - momentum based rotation - hover focus

## Chapter 5 --- Endurance

A procedural particle terrain.

Runner is a point-cloud human.

Scroll velocity controls: - runner cadence - terrain waves - particle
trails - camera speed

Camera ascends while tilting downward to reveal an infinite horizon.

## Persistent Story

A blue ink line begins in the portrait, becomes the medal ribbon,
transforms into circuitry between projects, wraps around the archive
cylinder, and finally becomes the marathon path.

## Performance

-   Lazy load heavy scenes.
-   GPU instancing.
-   Texture atlases.
-   Dynamic quality scaling.
-   Target 60 FPS.

------------------------------------------------------------------------

# Codex Prompt

Build this website as a production-quality portfolio.

Requirements:

-   HTML, CSS, JavaScript only.
-   Modular architecture.
-   Three.js for 3D scenes.
-   GSAP + ScrollTrigger.
-   Lenis.
-   No React.
-   Fully responsive.
-   Premium animations.
-   Clean code with reusable modules.
-   Every section must match this specification exactly.
-   Never replace premium interactions with placeholder cards.
-   Use physically believable animation with springs and inertia.
-   Optimize aggressively for performance.
-   Produce a complete project ready to open with index.html.
