/// <reference path="../test-globals.d.ts" />
export {};
const values = [1, 2, 3];
const record: Record<string, number> = Object.create(null);

for (;;) { break; }
for (const key in record) { void key; }
for (const value of values) { void value; }