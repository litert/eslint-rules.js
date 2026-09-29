/// <reference path="../test-globals.d.ts" />
export {};
if (ready) { run(); }
const object = { value: 1 };
const accessors = {
    get value() { return 1; },
};

void object;
void accessors;