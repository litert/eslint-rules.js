/// <reference path="../test-globals.d.ts" />
export {};

const maybe: string | null = Math.random() > 0.5 ? "x" : null;
const value = maybe!;
void value;
