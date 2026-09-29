/// <reference path="../test-globals.d.ts" />
export {};

declare function visit(callback: (value: number) => void): void;
visit(async (value) => { await Promise.resolve(value); });
