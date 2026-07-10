# 04_Global_Architecture.md

# Systems & Endurance

## Global Architecture Specification

Version 1.0

> This document defines the software architecture of the portfolio.
> Every module, file, subsystem and rendering pipeline must follow these
> rules.

------------------------------------------------------------------------

# 1. Architectural Goals

The architecture must be:

-   Modular
-   Performant
-   Extensible
-   Testable
-   Deterministic
-   Framework-independent

Business logic, rendering, animation, assets and content must remain
separated.

------------------------------------------------------------------------

# 2. High-Level Layers

1.  Core
2.  Rendering
3.  Animation
4.  Scene Modules
5.  UI Components
6.  Asset Pipeline
7.  Utilities
8.  Configuration

Each layer only communicates through well-defined interfaces.

------------------------------------------------------------------------

# 3. Suggested Folder Structure

    src/
     ├─ core/
     ├─ scenes/
     ├─ animation/
     ├─ rendering/
     ├─ shaders/
     ├─ assets/
     ├─ ui/
     ├─ content/
     ├─ utils/
     ├─ config/
     └─ main.js

Feature modules should own their logic, styles, assets and
configuration.

------------------------------------------------------------------------

# 4. Scene Manager

Each chapter is implemented as an independent scene module exposing:

-   preload()
-   initialize()
-   enter()
-   update()
-   resize()
-   exit()
-   dispose()

The Scene Manager coordinates lifecycle and transitions.

------------------------------------------------------------------------

# 5. Rendering Pipeline

Preferred flow:

Asset Load

↓

Scene Construction

↓

Animation Registration

↓

Scroll Timeline Binding

↓

Render Loop

↓

Post Processing

↓

Cleanup

------------------------------------------------------------------------

# 6. Animation System

GSAP timelines are centralized.

Individual modules must never manipulate global timelines directly.

Animations are registered through a timeline coordinator.

------------------------------------------------------------------------

# 7. Scroll Engine

Lenis provides smooth scrolling.

ScrollTrigger converts scroll progress into scene timelines.

Scenes must not listen to raw wheel events.

------------------------------------------------------------------------

# 8. Camera Manager

The camera is a shared service.

Responsibilities:

-   interpolation
-   cinematic movement
-   focus targets
-   resize handling
-   section ownership

Only one scene owns the camera at a time.

------------------------------------------------------------------------

# 9. Asset Manager

Responsible for:

-   image loading
-   HDR environments
-   textures
-   fonts
-   models
-   caching
-   reference counting

Assets are loaded lazily when possible.

------------------------------------------------------------------------

# 10. Event System

Use a lightweight publish/subscribe architecture.

Example events:

SceneEntered

SceneExited

AssetLoaded

ReducedMotionChanged

ViewportResized

------------------------------------------------------------------------

# 11. Performance Budget

Target:

60 FPS desktop

30+ FPS mobile

Avoid:

-   unnecessary layout thrashing
-   duplicate textures
-   excessive draw calls

Use GPU instancing whenever appropriate.

------------------------------------------------------------------------

# 12. Coding Standards

-   ES Modules
-   descriptive naming
-   no magic numbers
-   configuration over hardcoding
-   pure utility functions where possible

Functions should have a single responsibility.

------------------------------------------------------------------------

# 13. Error Handling

Missing assets must fail gracefully.

Animations should degrade rather than crash.

WebGL failure should fall back to simplified DOM content.

------------------------------------------------------------------------

# 14. Accessibility Architecture

Reduced Motion

Keyboard navigation

Semantic HTML

Progressive enhancement

Every experience should remain usable without WebGL.

------------------------------------------------------------------------

# 15. Acceptance Criteria

A new developer should understand where any new feature belongs without
restructuring the project.

No module should exceed its defined responsibility.

The architecture should comfortably support future chapters, additional
projects and new interactions without major refactoring.
