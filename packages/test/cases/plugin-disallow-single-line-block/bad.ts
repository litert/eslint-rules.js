/// <reference path="../test-globals.d.ts" />
export {};
if (true) { run(); }
function processValue(value: number): number { return value; }
const runProcess = () => { run(); };
{ run(); }

void processValue(1);
void runProcess;