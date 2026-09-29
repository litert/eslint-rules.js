/// <reference path="../test-globals.d.ts" />
export {};
try {
    throw new Error('expected');
} catch (error) { void error; }