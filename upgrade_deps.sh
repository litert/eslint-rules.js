#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)
cd $SCRIPT_ROOT

npm i -D \
    eslint-plugin-eslint-plugin@latest \
    eslint-plugin-node@latest \
    mocha@latest

npm i @typescript-eslint/eslint-plugin@latest \
    @typescript-eslint/parser@latest \
    eslint@latest \
    eslint-plugin-deprecation@latest

rm -rf node_modules package-lock.json

npm i
