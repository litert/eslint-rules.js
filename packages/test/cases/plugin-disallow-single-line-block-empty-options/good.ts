/// <reference path="../test-globals.d.ts" />
export {};
const accessors = {
    get value() { return 1; },
    set value(next: number) { void next; },
};
const record = { value: 1 };

void accessors;
void record;