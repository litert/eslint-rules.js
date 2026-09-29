/// <reference path="../test-globals.d.ts" />
export {};
const values: number[] = [];
const record: Record<string, number> = Object.create(null);
let ready = true;
let state = 1;
declare function use(callback?: () => void): void;

if (ready) { use(); }
for (;;) { break; }
for (const key in record) { void key; }
for (const value of values) { void value; }
while (ready) { break; }
switch (state) {
    case 1: { use(); }
    default: break;
}
do { use(); } while (ready);
try {
    use();
} catch (error) { void error; }
try {
    use();
} finally { use(); }
use(() => { use(); });
const arrow = () => { use(); };
use(function callback() { use(); });
function declaration(): void { use(); }
const expression = function expression(): void { use(); };
const accessors = {
    get value() { return 1; },
    set value(next: number) { void next; },
};
const object = { value: 1 };
class StaticExample {
    static { use(); }
}
switch (state) { case 2: use(); }

void arrow;
void expression;
void accessors;
void object;