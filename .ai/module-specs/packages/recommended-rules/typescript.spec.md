# Module Spec for packages/recommended-rules/typescript.js

## Overview

Defines the recommended ESLint flat config for TypeScript codebases using the LiteRT plugin.

## Responsibility

- Register the required plugins and parser for TypeScript linting.
- Configure the project's default rule severities and exceptions.
- Preserve common TypeScript coding patterns that the project intends to allow by default.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing implementation.
- [2026-09-28] Enabled the `arrow-function` exception for `@litert/disallow-single-line-block`.