# 03_Motion_Bible.md

# Systems & Endurance

## Motion Bible

Version 1.0

> Motion is the primary storytelling medium of this portfolio. Every
> animation must communicate intent, mass, direction, and continuity.
> Nothing moves simply because it can.

------------------------------------------------------------------------

# 1. Motion Philosophy

Every movement answers one of four questions:

-   What deserves attention?
-   Where did it come from?
-   Where is it going?
-   Why is it moving?

If an animation cannot answer these questions, it should be removed.

------------------------------------------------------------------------

# 2. Physical Rules

All moving objects obey simulated physics rather than linear
interpolation.

Default spring characteristics:

-   Mass: 1.0
-   Damping: medium-high
-   Overshoot: minimal
-   Rest threshold: imperceptible

Heavy objects: - medals - documents - camera rigs

Light objects: - particles - handwritten strokes - dust - highlights

------------------------------------------------------------------------

# 3. Scroll Choreography

Scrolling is not navigation.

Scrolling advances the film.

Every chapter owns a timeline.

Each timeline contains:

-   Introduction
-   Build
-   Reveal
-   Interaction
-   Exit

No scene begins abruptly.

------------------------------------------------------------------------

# 4. Camera Language

The camera behaves like a professional cinema dolly.

Never teleport.

Allowed movements:

-   Dolly
-   Crane
-   Truck
-   Pedestal
-   Slow orbit
-   Controlled tilt

Avoid rapid rotations.

------------------------------------------------------------------------

# 5. Scene Transitions

Transitions must preserve continuity.

Preferred techniques:

-   dissolve into particles
-   morph one object into another
-   shared motion vectors
-   persistent blue path
-   lighting continuity

Hard cuts are prohibited except for deliberate dramatic emphasis.

------------------------------------------------------------------------

# 6. Hero Sequence

Timeline

0.0s: White canvas.

0.5s: Ink particles appear.

1.0s: Portrait begins drawing.

3.5s: Portrait complete.

4.0s: Micro breathing starts.

4.5s: Smile appears.

5.0s: Headline fades.

5.5s: Annotation writes itself.

First scroll: Portrait dissolves.

------------------------------------------------------------------------

# 7. Medal Sequence

The medal enters from outside the viewport.

Stages:

1.  Ribbon tension.
2.  Swing.
3.  Overshoot.
4.  Return.
5.  Achievement reveal.
6.  Slow oscillation.
7.  Exit.

The medal should visibly feel heavy.

------------------------------------------------------------------------

# 8. Project Sequence

Every project follows identical cinematic pacing.

Entry

Background color transition.

Showcase panel rises.

Devices emerge.

Typography fades.

Interaction unlocks.

Exit

Camera moves forward into the next project.

------------------------------------------------------------------------

# 9. Vault Sequence

Cylinder rotates continuously.

Scroll modifies angular velocity.

Stopping scroll does not stop rotation instantly.

Momentum decays naturally.

Hovering a document slows local rotation and subtly increases scale.

------------------------------------------------------------------------

# 10. Athletics Sequence

Runner begins at walking cadence.

Scroll velocity increases stride frequency.

Terrain amplitude increases slightly.

Camera cranes upward while tilting downward.

Final frame reveals an infinite horizon.

------------------------------------------------------------------------

# 11. Motion Timing

Micro interactions: 80--180 ms

UI transitions: 250--450 ms

Section transitions: 800--1800 ms

Major reveals: 2--5 seconds

------------------------------------------------------------------------

# 12. Particle Rules

Particles support motion but never replace content.

Maximum density depends on hardware capability.

Particles inherit local lighting.

------------------------------------------------------------------------

# 13. Motion Accessibility

Reduced motion mode:

-   Disable camera travel
-   Reduce parallax
-   Replace springs with fades
-   Preserve narrative order

------------------------------------------------------------------------

# Acceptance Criteria

A visitor should be able to infer hierarchy, weight, and narrative
progression from motion alone, even if all text were removed.
