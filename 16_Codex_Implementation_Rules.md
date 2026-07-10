# 16_Codex_Implementation_Rules.md

# Systems & Endurance

## Codex Implementation Rules

Version 1.0

> This document governs how any AI coding agent (including Codex) must
> implement the portfolio. It is not a design document; it is an
> execution contract.

------------------------------------------------------------------------

# 1. Primary Objective

Implement the portfolio exactly as specified across all prior documents
without introducing unapproved creative interpretations.

When in doubt, preserve intent over convenience.

------------------------------------------------------------------------

# 2. Guiding Principles

-   Build production-quality code only.
-   Prefer maintainability over cleverness.
-   Optimize after correctness.
-   Every feature must be modular.
-   Every interaction must be deterministic.

------------------------------------------------------------------------

# 3. Forbidden Behaviors

Codex MUST NOT:

-   Replace complex interactions with placeholder cards.
-   Ignore performance budgets.
-   Collapse multiple modules into one file for convenience.
-   Hard-code values that belong in configuration.
-   Introduce dependencies not justified by the specification.
-   Change the narrative flow.

If a requested feature cannot be implemented, document the limitation
rather than silently simplifying it.

------------------------------------------------------------------------

# 4. Required Behaviors

For every feature:

1.  Read the relevant specification.
2.  Identify dependencies.
3.  Implement the smallest complete unit.
4.  Verify functionality.
5.  Optimize.
6.  Document.

------------------------------------------------------------------------

# 5. Module Rules

Each module must own:

-   logic
-   styles
-   assets
-   configuration
-   documentation

Avoid cross-module coupling.

------------------------------------------------------------------------

# 6. Code Quality

Every public function requires:

-   JSDoc
-   typed parameter descriptions
-   return documentation
-   error conditions

Avoid duplicated logic.

------------------------------------------------------------------------

# 7. Performance Rules

Before introducing:

-   particles
-   shaders
-   post-processing
-   heavy textures

Codex must verify that the feature remains within defined performance
budgets.

Fallbacks must exist for lower-tier hardware.

------------------------------------------------------------------------

# 8. Accessibility Rules

Every interaction must remain usable with:

-   keyboard navigation
-   reduced motion
-   semantic HTML
-   sufficient contrast

Accessibility is not optional.

------------------------------------------------------------------------

# 9. Validation Gates

A chapter is complete only when:

-   visual specification satisfied
-   engineering specification satisfied
-   accessibility verified
-   performance verified
-   no blocking console errors
-   responsive behavior validated

------------------------------------------------------------------------

# 10. Output Expectations

Generated code should include:

-   meaningful filenames
-   modular folder structure
-   reusable utilities
-   explanatory comments where rationale is non-obvious

No placeholder TODOs in completed features.

------------------------------------------------------------------------

# 11. Escalation Rules

If requirements conflict:

Priority order:

1.  Project Vision
2.  Creative Direction
3.  Design System
4.  Motion Bible
5.  Chapter Specifications
6.  Engineering Specifications
7.  Local implementation details

Never invent new priorities.

------------------------------------------------------------------------

# 12. Definition of Done

A milestone is complete only if:

-   implementation matches the specification
-   builds successfully
-   passes automated checks
-   passes manual review
-   maintains performance targets
-   integrates cleanly with previous milestones

No feature should be considered complete based solely on visual
appearance.

------------------------------------------------------------------------

# Acceptance Criteria

A coding agent following this document should consistently produce
maintainable, specification-compliant code while minimizing creative
drift and avoiding implementation shortcuts.
