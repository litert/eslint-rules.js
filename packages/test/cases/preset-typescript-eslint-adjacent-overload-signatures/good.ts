/// <reference path="../test-globals.d.ts" />
export {};

class Converter {
    convert(value: string): string;
    convert(value: number): string;
    convert(value: string | number): string {
        return String(value);
    }
}
