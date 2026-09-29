/// <reference path="../test-globals.d.ts" />
export {};

const value = 'ready';
const found = value.match(/^ready/) !== null;
void found;
