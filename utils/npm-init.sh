#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd "$SCRIPT_ROOT"/..

if [[ -f "node_modules/.bin/ottoia" ]]; then
    npx ottoia bootstrap -N
fi
