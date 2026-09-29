/// <reference path="../test-globals.d.ts" />
export {};

interface Factory {
    create(): Factory;
}
