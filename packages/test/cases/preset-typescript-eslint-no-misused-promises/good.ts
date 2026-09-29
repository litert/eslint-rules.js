/// <reference path="../test-globals.d.ts" />
export {};

function visit(callback: (value: number) => void): void {
    callback(1);
}
visit((value) => { void value; });
