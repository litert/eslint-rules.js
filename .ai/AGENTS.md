# AI Agent Guidelines

[TOC]

## Overview

This repository contains LiteRT ESLint custom rules, recommended presets, and test fixtures used to validate both direct rule behavior and consumer-facing preset behavior.

## File Structure

- `packages/plugin/` contains the published ESLint plugin and rule implementations.
- `packages/recommended-rules/` contains shareable recommended flat configs.
- `packages/test/` contains node-based rule tests and TypeScript ESLint integration fixtures.
- `.ai/module-specs/` stores source-module spec files mirrored from the repo layout for AI maintenance workflows.

## How to?

- Run `./utils/test.sh` from the repository root to execute the full rule and TypeScript preset test suite with per-case JavaScript test output.
- Run `node packages/test/rules/<rule>.js` to inspect the individual JavaScript test cases for one rule.

## Common Issues

- `@litert/disallow-single-line-block` distinguishes `arrow-callback` from `arrow-function`: the former only covers arrow functions passed as call arguments, while the latter covers other arrow-function bodies.

## Rules

- You must always follow the rules and guidelines in `.ai/rules/index.md`.
