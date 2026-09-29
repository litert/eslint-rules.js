/// <reference path="../test-globals.d.ts" />
export {};

function identity<T = number>(value: T): T { return value; }
const result = identity(1);
void result;
