# Module Spec for packages/plugin/rules/disallow-single-line-block.js

## Overview

Defines an ESLint layout rule that rejects single-line block bodies unless the enclosing construct is explicitly exempted by configuration.

## Responsibility

- Validate the option schema for supported block exceptions, including catch, finally, accessors, and object expressions.
- Detect non-empty single-line block bodies for statements, static blocks, switches, and object expressions; exempt class bodies and every empty block.
- Map a block body back to its owning construct so callback-specific, accessor, and non-callback exception flags remain mutually exclusive.

## TODO

## History

- [2026-09-28] Spec created retroactively from existing implementation.
- [2026-09-28] Added `arrow-function` as a distinct exception to cover non-callback arrow functions without allowing all function blocks.
- [2026-09-28] Defined empty blocks as single-line blocks and kept arrow callback exceptions separate from ordinary arrow-function exceptions.
- [2026-09-28] Exempted empty non-arrow function, constructor, callback, and method bodies.
- [2026-09-28] Exempted class bodies from single-line block validation.
- [2026-09-28] Added catch, finally, getter, setter, and object-expression exception behavior; all empty blocks are exempt.
