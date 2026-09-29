/// <reference path="../test-globals.d.ts" />
export {};

async function loadValue(): Promise<number> {
    return 1;
}

async function useValue(): Promise<number> {
    return loadValue();
}
