/// <reference path="../test-globals.d.ts" />
export {};

declare const symbolValue: symbol;
const value = 1 + symbolValue;
void value;
