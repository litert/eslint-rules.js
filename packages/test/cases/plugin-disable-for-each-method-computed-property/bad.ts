/// <reference path="../test-globals.d.ts" />
export {};

const values = [1, 2, 3];

values['forEach']((value) => { void value; });