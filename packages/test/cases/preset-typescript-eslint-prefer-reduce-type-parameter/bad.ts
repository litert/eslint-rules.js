/// <reference path="../test-globals.d.ts" />
export {};

const names = ['a', 'b'];
const index = names.reduce(
    (result, name) => ({ ...result, [name]: true }),
    {} as Record<string, boolean>,
);
void index;
