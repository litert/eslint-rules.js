/// <reference path="../test-globals.d.ts" />
export {};
const values = [1, 2, 3];

for (const value of values) {
    void value;
}

const callback = values.forEach;
void callback;

const doubled = values.map((value) => value * 2);
const filtered = values.filter((value) => value > 1);

function forEach(): void {}

forEach();
void doubled;
void filtered;