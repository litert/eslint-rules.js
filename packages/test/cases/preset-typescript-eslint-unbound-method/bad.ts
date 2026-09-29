/// <reference path="../test-globals.d.ts" />
export {};

class Example { method(): void {} }
const method = new Example().method;
method();
