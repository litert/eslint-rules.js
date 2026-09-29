/// <reference path="../test-globals.d.ts" />
export {};

interface Item { nested?: { ready?: boolean }; }
declare const item: Item | undefined;
if (item && item.nested && item.nested.ready) {}
