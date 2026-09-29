/// <reference path="../test-globals.d.ts" />
export {};

class Base {}
class Child extends Base {
    read(): number { return 1; }
}
