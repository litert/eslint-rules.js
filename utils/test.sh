#!/usr/bin/env bash
set -euo pipefail

SCRIPT_ROOT=$(cd $(dirname "$0"); pwd)
REPO_ROOT=$(cd "$SCRIPT_ROOT"/..; pwd)
TS_TEST_DIR="$REPO_ROOT/packages/test/ts"
TS_LINT_LOG="$TS_TEST_DIR/lint.log"

cd "$REPO_ROOT"

node --test packages/test/rules/*.js

cd "$TS_TEST_DIR"
npx eslint -c eslint.config.js "cases/**/*.ts" > "$TS_LINT_LOG"

TEST_NO_CONSOLE=$(grep -c "no-console" "$TS_LINT_LOG" || true)

if [ "$TEST_NO_CONSOLE" -ne 5 ]; then
	echo "Rule 'no-console' test failed"
	exit 1
fi

TEST_MAX_LINES=$(grep -E -c "max-lines$" "$TS_LINT_LOG" || true)

if [ "$TEST_MAX_LINES" -ne 1 ]; then
	echo "Rule 'max-lines' test failed"
	exit 1
fi

TEST_NO_EXPLICIT_ANY=$(grep -E -c "@typescript-eslint/no-explicit-any$" "$TS_LINT_LOG" || true)

if [ "$TEST_NO_EXPLICIT_ANY" -ne 2 ]; then
	echo "Rule '@typescript-eslint/no-explicit-any' test failed"
	exit 1
fi

echo "packages/test passed"

