/// <reference path="../test-globals.d.ts" />
export {};

class Example {
    constructor(private value: number) {}
    read(): number { return this.value; }
}
