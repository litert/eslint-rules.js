/// <reference path="../test-globals.d.ts" />
export {};
if (ready) {
    run();
}

function emptyFunction(): void {}
const emptyObject = {};

void emptyFunction;
void emptyObject;