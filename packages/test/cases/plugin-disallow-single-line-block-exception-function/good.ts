/// <reference path="../test-globals.d.ts" />
export {};
function declaration(): void { complete(); }
const expression = function expression(): void { complete(); };
const arrow = () => { complete(); };
register(() => { complete(); });
register(function callback() { complete(); });

void expression;
void arrow;