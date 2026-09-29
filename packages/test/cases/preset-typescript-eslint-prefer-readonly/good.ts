/// <reference path="../test-globals.d.ts" />
export {};

class Box {
    private readonly value: number;
    constructor(value: number) { this.value = value; }
    read(): number { return this.value; }
}
