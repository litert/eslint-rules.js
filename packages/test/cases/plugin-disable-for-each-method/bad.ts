/// <reference path="../test-globals.d.ts" />
export {};
const values = [1, 2, 3];

values.forEach((value) => { void value; });
values.forEach(function visit(value) { void value; });
values?.forEach((value) => { void value; });
values.forEach(undefined as unknown as (value: number) => void);

const createValues = () => values;
createValues().forEach((value) => { void value; });