# 13_Coding_Standards_and_Project_Conventions.md

# Systems & Endurance

## Coding Standards & Project Conventions

Version 1.0

> This document defines the engineering standards for every line of code
> in the project. Consistency is considered a feature.

------------------------------------------------------------------------

# 1. Goals

The codebase must be:

-   Readable
-   Predictable
-   Modular
-   Testable
-   Performant
-   Self-documenting

Code should optimize for long-term maintainability rather than the
shortest implementation.

------------------------------------------------------------------------

# 2. Repository Layout

    /
    ├── assets/
    ├── docs/
    ├── public/
    ├── src/
    │   ├── animation/
    │   ├── components/
    │   ├── config/
    │   ├── core/
    │   ├── rendering/
    │   ├── scenes/
    │   ├── shaders/
    │   ├── styles/
    │   ├── utils/
    │   └── main.js
    ├── tests/
    └── package.json

------------------------------------------------------------------------

# 3. Naming Conventions

Files: - kebab-case

Classes: - PascalCase

Functions: - camelCase

Constants: - UPPER_SNAKE_CASE

Private members: - leading underscore

Names should describe intent rather than implementation.

------------------------------------------------------------------------

# 4. JavaScript Standards

-   ES Modules only
-   Strict mode
-   Prefer `const`
-   Use `let` only when mutation is required
-   Avoid global state
-   Avoid anonymous functions for exported APIs

Every public function should include JSDoc.

------------------------------------------------------------------------

# 5. CSS Standards

-   CSS custom properties for design tokens
-   BEM-inspired component naming where appropriate
-   No `!important`
-   Minimize selector specificity
-   Separate layout, component, and utility styles

------------------------------------------------------------------------

# 6. Architecture Rules

Each module should have one responsibility.

Scene modules must not directly manipulate unrelated scenes.

Rendering code must remain separate from business logic.

------------------------------------------------------------------------

# 7. Error Handling

-   Fail gracefully
-   Surface actionable console errors in development
-   Silence expected recoverable failures in production
-   Never leave the UI in a broken state

------------------------------------------------------------------------

# 8. Performance Rules

Avoid:

-   unnecessary DOM queries
-   forced synchronous layouts
-   duplicated animation timelines
-   repeated asset loading

Profile before optimizing.

------------------------------------------------------------------------

# 9. Documentation

Every module should contain:

-   Purpose
-   Dependencies
-   Public API
-   Usage example (when applicable)

Complex algorithms should include explanatory comments describing *why*,
not *what*.

------------------------------------------------------------------------

# 10. Git Workflow

Branches:

-   main
-   develop
-   feature/\*
-   fix/\*
-   refactor/\*
-   docs/\*

Commits should follow:

-   feat:
-   fix:
-   docs:
-   refactor:
-   perf:
-   chore:

------------------------------------------------------------------------

# 11. Code Review Checklist

Before merging:

-   Naming is consistent
-   No dead code
-   No duplicated logic
-   Performance impact reviewed
-   Accessibility maintained
-   Documentation updated
-   Tests pass

------------------------------------------------------------------------

# 12. Acceptance Criteria

A new engineer should be able to understand the project structure,
coding style, and architectural expectations within a single day of
onboarding.
