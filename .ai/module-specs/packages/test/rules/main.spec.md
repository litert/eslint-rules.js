# Module Spec for packages/test/rules

## Overview

Contains Node.js test suites for the ESLint plugin rules and recommended configurations.

## Responsibility

- Verify observable rule diagnostics through ESLint's public `Linter` interface.
- Keep each exception configuration and its inverse result independently visible in Node.js test output.
- Cover documented defaults and boundary behavior without relying on rule internals.

## Contents

- `disable-for-each-method.js` — verifies the `disable-for-each-method` rule.
- `disallow-single-line-block.js` — verifies the `disallow-single-line-block` rule.
- `recommended-rules-typescript.js` — verifies the published TypeScript recommended configuration.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing test files.
