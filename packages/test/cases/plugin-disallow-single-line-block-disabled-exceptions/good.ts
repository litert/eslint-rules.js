/// <reference path="../test-globals.d.ts" />
export {};
const values: number[] = [];
const record: Record<string, number> = Object.create(null);

if (values.length === 0) {
}
const emptyObject = {};
function emptyFunction(): void {}
function commentOnly(): void { /* empty */ }
class EmptyClass {
    constructor() {}
    method(): void {}
    static {}
}
switch (0) {}
try {} catch (error) {}
try {} finally {}
interface EmptyInterface {}
type EmptyType = {};
enum EmptyEnum {}
namespace EmptyNamespace {}

void record;
void emptyObject;
void emptyFunction;
void EmptyClass;
void EmptyEnum;