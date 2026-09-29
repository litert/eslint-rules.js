/// <reference path="../test-globals.d.ts" />
export {};

class Example {
    convert(value: string): void;
    other(): void {}
    convert(value: number): void;
    convert(value: string | number): void {}
}
