/// <reference path="../test-globals.d.ts" />
export {};

declare const maybeValue: string | undefined;
const value = maybeValue ?? 'fallback';
void value;
