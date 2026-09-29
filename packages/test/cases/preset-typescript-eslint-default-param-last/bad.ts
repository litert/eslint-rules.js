/// <reference path="../test-globals.d.ts" />
export {};

function greet(name = "world", suffix: string): string { return name + suffix; }
