# Module Spec for packages/test/rules/disallow-single-line-block.js

## Overview

Verifies the public behavior of the `disallow-single-line-block` ESLint rule.

## Responsibility

- Exercise each supported exception when enabled and disabled with independently reported Node.js test cases.
- Verify callback, accessor, and non-callback arrow-function exceptions have distinct scopes.
- Verify defaults, exempt class bodies, and all empty JavaScript and TypeScript block-like structures.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing test implementation.
- [2026-09-28] Added coverage for empty functions, callbacks, constructors, and methods.
- [2026-09-28] Added coverage for exempt single-line class bodies.
- [2026-09-28] Added coverage for catch, finally, accessors, object expressions, and empty TypeScript structures.
