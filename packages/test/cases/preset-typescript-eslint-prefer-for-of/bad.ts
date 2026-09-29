/// <reference path="../test-globals.d.ts" />
export {};

const values = [1, 2];
for (let index = 0; index < values.length; index += 1) {
    void values[index];
}
