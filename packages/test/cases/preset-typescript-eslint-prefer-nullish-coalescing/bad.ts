/// <reference path="../test-globals.d.ts" />
export {};

const maybe: string | undefined = undefined;
const value = maybe || 'fallback';
void value;
