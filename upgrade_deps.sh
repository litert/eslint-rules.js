#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)
cd $SCRIPT_ROOT

npm i -D \
    @litert/ottoia@latest \
    eslint-plugin-eslint-plugin@latest \
    eslint-plugin-node@latest

npm i @eslint/js@latest \
    @stylistic/eslint-plugin@latest \
    eslint@latest \
    typescript-eslint@latest

rm -rf node_modules package-lock.json

npm i
