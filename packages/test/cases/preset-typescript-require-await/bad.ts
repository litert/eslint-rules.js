/// <reference path="../test-globals.d.ts" />
export {};

async function loadValue(): Promise<number> {
    return 1;
}

void loadValue;