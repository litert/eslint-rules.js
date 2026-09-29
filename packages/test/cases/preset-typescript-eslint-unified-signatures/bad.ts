/// <reference path="../test-globals.d.ts" />
export {};

function convert(value: string): string;
function convert(value: number): string;
function convert(value: string | number): string {
    return String(value);
}
