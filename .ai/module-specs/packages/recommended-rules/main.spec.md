# Module Spec for packages/recommended-rules

## Overview

Provides shareable recommended ESLint rule presets for LiteRT projects.

## Responsibility

- Export stable preset entrypoints for consumers.
- Encode the project's default rule preferences for supported environments.
- Keep preset behavior aligned with plugin rule semantics and real-world project usage.

## Contents

- `index.js` — exports the available preset entrypoints.
- `typescript.js` — defines the TypeScript-oriented recommended ESLint configuration.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing implementation.
- [2026-09-28] Updated the TypeScript preset to allow single-line non-callback arrow-function bodies.