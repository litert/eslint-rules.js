# Module Spec for packages/plugin/rules

## Overview

Contains the custom ESLint rule implementations exported by the plugin package.

## Responsibility

- Define rule behavior, option schemas, and diagnostic messages.
- Keep rule semantics aligned with the documented configuration surface.
- Preserve backward compatibility for existing option names where practical.

## Contents

- `disable-for-each-method.js` — disallows `Array.prototype.forEach` usage.
- `disallow-single-line-block.js` — disallows single-line block bodies except configured exceptions.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing implementation.
- [2026-09-28] Added support for distinguishing general arrow-function exceptions from arrow callbacks.