/// <reference path="../test-globals.d.ts" />
export {};

function greet(suffix: string, name = 'world'): string {
    return name + suffix;
}
