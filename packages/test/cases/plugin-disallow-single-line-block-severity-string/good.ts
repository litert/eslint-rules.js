/// <reference path="../test-globals.d.ts" />
export {};
const record = {
    get value() { return 1; },
    set value(next: number) { void next; },
};
const object = { value: 1 };

void record;
void object;