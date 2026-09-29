/// <reference path="../test-globals.d.ts" />
export {};

interface Item { value?: string; }
declare const item: Item;
const matches = item.value! === 'ready';
void matches;
