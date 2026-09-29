/// <reference path="../test-globals.d.ts" />
export {};

const names = ['a', 'b'];
const index = names.reduce<Record<string, boolean>>(
    (result, name) => ({ ...result, [name]: true }),
    {},
);
void index;
