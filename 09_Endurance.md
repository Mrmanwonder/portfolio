# 09_Endurance.md

# Systems & Endurance

## Chapter 05 --- Endurance

### Athletics & Resilience Experience Specification

Version 1.0

> Endurance is the final chapter. It is not about sport---it is about
> discipline becoming identity. The visitor should leave with the
> impression that persistence is as fundamental to the creator as
> technical ability.

------------------------------------------------------------------------

# 1. Narrative Purpose

This chapter answers:

**"How was this mindset built?"**

Running is presented as a training system for resilience, consistency
and decision-making under stress.

------------------------------------------------------------------------

# 2. Environment

The scene transitions from the Vault into an expansive procedural
landscape.

Characteristics:

-   Infinite horizon
-   Sparse visual language
-   Calm atmosphere
-   Blue-white particle terrain
-   Large sense of scale

The environment should communicate freedom rather than complexity.

------------------------------------------------------------------------

# 3. Scene Graph

Three.js hierarchy:

Scene ├── Camera Rig ├── Terrain ├── Runner ├── Particle System ├──
Lighting ├── Atmospheric Fog ├── Post Processing └── UI Overlay

Every object belongs to exactly one parent.

------------------------------------------------------------------------

# 4. Terrain

The terrain is generated procedurally.

Requirements:

-   smooth rolling topology
-   continuous deformation
-   point-cloud representation
-   no visible tiling
-   infinite scrolling illusion

LOD should reduce vertex density outside the camera focus.

------------------------------------------------------------------------

# 5. Runner

The runner is represented as a stylized point-cloud figure.

Rules:

-   anatomically believable proportions
-   rhythmic stride
-   stable silhouette
-   subtle breathing
-   arm-leg synchronization

No photorealistic human model is required.

------------------------------------------------------------------------

# 6. Camera Choreography

Entry: Low angle.

Middle: Camera cranes upward.

End: Camera tilts toward the horizon.

Movement should feel as though it is floating on a stabilized drone.

------------------------------------------------------------------------

# 7. Scroll Mapping

0--20% Terrain appears.

20--40% Runner materializes.

40--70% Camera ascends.

70--100% Runner continues toward an endless horizon while narrative text
concludes.

------------------------------------------------------------------------

# 8. Particle Behaviour

Terrain particles:

-   respond to terrain deformation
-   shimmer subtly
-   inherit lighting

Runner particles:

-   maintain formation
-   emit tiny trails during faster motion
-   never detach excessively

------------------------------------------------------------------------

# 9. Lighting

Golden-hour inspired.

Key Light: Warm.

Fill: Cool blue.

Atmosphere: Soft volumetric haze.

No harsh shadows.

------------------------------------------------------------------------

# 10. Interaction

Scroll velocity influences:

-   runner cadence
-   terrain wave frequency
-   particle trail intensity

Pointer movement creates only a slight camera offset.

The visitor should never feel in direct control of the runner.

------------------------------------------------------------------------

# 11. Performance

Target: 60 FPS desktop 30+ FPS mobile

Optimizations:

-   GPU instancing
-   frustum culling
-   adaptive particle count
-   dynamic quality scaling
-   post-processing disabled on lower tiers

------------------------------------------------------------------------

# 12. Accessibility

Reduced Motion:

-   static terrain
-   fixed camera
-   runner loops at constant cadence
-   no scroll-linked acceleration

Narrative text remains fully readable.

------------------------------------------------------------------------

# 13. Closing Sequence

As the visitor reaches the end:

The runner gradually disappears into the horizon.

The blue path resolves into a single hand-drawn line.

The line writes:

"Still building."

Below:

Tanmay Harkawat

No buttons. No call-to-action.

Allow several seconds of silence before the page ends.

------------------------------------------------------------------------

# 14. Acceptance Criteria

The final impression should be:

-   disciplined
-   optimistic
-   technically accomplished
-   memorable
-   understated

The visitor should leave feeling they experienced a coherent journey
rather than five disconnected sections.
