#!/usr/bin/env bash
set -euo pipefail

SCRIPT_ROOT=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$SCRIPT_ROOT/.." && pwd)

cd "$REPO_ROOT"

node "$REPO_ROOT/packages/test/run-cases.js"

shopt -s globstar nullglob
validation_tests=(packages/test/cases/**/*.test.js)

if (( ${#validation_tests[@]} == 0 )); then
	echo "No case validation tests were found"
	exit 1
fi

node --test --test-concurrency=3 "${validation_tests[@]}"

echo "packages/test passed"
