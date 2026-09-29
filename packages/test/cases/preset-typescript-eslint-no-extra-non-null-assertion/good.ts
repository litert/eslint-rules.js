/// <reference path="../test-globals.d.ts" />
export {};

interface Item { value: string; }
declare const item: Item | null;
const value = item!.value;
void value;
