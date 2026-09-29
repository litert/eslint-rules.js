/// <reference path="../test-globals.d.ts" />
export {};
const accessors = {
    get value() { return 1; },
    set value(next: number) { void next; },
};
const object = { value: 1 };
const emptyObject = {};

function emptyFunction(): void {}
function commentOnly(): void { /* intentionally empty */ }
const emptyArrow = () => {};
register(() => {});
register(function emptyCallback() {});

const emptyObjectMembers = {
    method() {},
    get value() {},
    set value(next: number) {},
};

class EmptyClass {}

class Container {
    constructor() {}
    method(): void {}
    static {}
}

switch (1) {}

try {} catch (error) {}
try {} finally {}

interface EmptyInterface {}
type EmptyType = {};
enum EmptyEnum {}
namespace EmptyNamespace {}

function processValue(value: number): number {
    return value;
}

void processValue(1);
void accessors;
void object;
void emptyObject;
void emptyFunction;
void commentOnly;
void emptyArrow;
void emptyObjectMembers;
void EmptyClass;
void Container;
void EmptyEnum;