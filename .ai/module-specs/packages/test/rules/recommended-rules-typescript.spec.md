# Module Spec for packages/test/rules/recommended-rules-typescript.js

## Overview

Verifies that the published TypeScript recommended ESLint configuration loads in the ESLint CLI and activates the LiteRT rules.

## Responsibility

- Run the ESLint CLI in the TypeScript fixture directory and parse its JSON output.
- Preserve the ESLint CLI child process's normal execution environment.
- Verify the recommended configuration reports the expected custom rules and permits configured arrow-function bodies.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing test implementation.
- [2026-09-28] Added named test cases for the published configuration contract.
