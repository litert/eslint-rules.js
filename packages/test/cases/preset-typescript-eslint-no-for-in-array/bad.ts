/// <reference path="../test-globals.d.ts" />
export {};

const values = [1, 2];
for (const index in values) { void values[index]; }
