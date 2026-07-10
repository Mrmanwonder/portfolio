# 05_Hero.md

# Systems & Endurance

## Chapter 01 --- Arrival

### Hero Experience Specification

Version 1.0

> This document completely specifies the Hero chapter. It defines
> layout, animation, interaction, rendering, performance and acceptance
> criteria.

------------------------------------------------------------------------

# 1. Narrative Purpose

The Hero is not an introduction.

It is a first impression.

Within ten seconds, the visitor should conclude that this portfolio
belongs to someone who values precision, craftsmanship, systems thinking
and discipline.

The visitor should feel curiosity rather than information overload.

------------------------------------------------------------------------

# 2. Emotional Timeline

  Time           Emotion
  -------------- --------------
  0--2 s         Curiosity
  2--5 s         Recognition
  5--8 s         Confidence
  First Scroll   Anticipation

No content should rush the visitor.

------------------------------------------------------------------------

# 3. Layout

Background: - Pure white (#FFFFFF)

Viewport: - Full height - No visible navigation - No buttons - No
cards - No decorative shapes

The portrait occupies approximately 40% of viewport height.

Headline occupies the opposite visual weight.

Whitespace is intentionally dominant.

------------------------------------------------------------------------

# 4. Portrait

The portrait must NOT resemble a stock illustration.

Requirements:

-   Hand-drawn appearance
-   Blue ink aesthetic
-   Slight pressure variation
-   Hundreds of spline segments
-   Organic imperfections
-   Human proportions
-   Neutral expression that evolves into a smile

Optional implementation:

-   SVG path network
-   Canvas stroke renderer
-   WebGL line renderer

------------------------------------------------------------------------

# 5. Drawing Animation

The drawing should appear as if one continuous pen is creating it.

Sequence:

1.  Chin
2.  Jaw
3.  Ear
4.  Hair
5.  Eyes
6.  Nose
7.  Mouth
8.  Detail strokes

Drawing speed varies naturally.

No segment should begin before the previous feels established.

------------------------------------------------------------------------

# 6. Micro Animations

After completion:

-   breathing
-   occasional blink
-   subtle eye movement
-   tiny head drift
-   gentle smile

Movement should almost disappear if the user stops paying attention.

------------------------------------------------------------------------

# 7. Typography

Headline:

"I build systems."

The word "systems" is handwritten in Cerulean Blue.

Supporting annotation:

"...and run far."

The annotation should feel like it was written moments after the main
title.

------------------------------------------------------------------------

# 8. Scroll Exit

The first scroll initiates transition.

Portrait:

-   breaks into ink particles
-   fades
-   drifts upward

Headline:

-   loses opacity
-   translates slightly upward

Background remains white to prepare for Chapter 2.

------------------------------------------------------------------------

# 9. Camera

Orthographic appearance.

No exaggerated perspective.

Camera remains stable.

Only extremely subtle parallax between foreground and background.

------------------------------------------------------------------------

# 10. Performance Budget

Portrait draw: \< 2 seconds on modern desktop.

Animation: 60 FPS target.

GPU acceleration preferred where practical.

------------------------------------------------------------------------

# 11. Accessibility

Reduced Motion:

-   Portrait appears already drawn.
-   Smile fades in.
-   Text fades only.
-   No particle dissolve.

------------------------------------------------------------------------

# 12. Acceptance Criteria

A successful Hero should:

-   immediately establish identity
-   feel handcrafted
-   communicate confidence without arrogance
-   encourage scrolling
-   avoid unnecessary interaction
-   leave the viewer wanting to discover the next chapter
