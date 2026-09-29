/// <reference path="../test-globals.d.ts" />
export {};

type Direction = 'left' | 'right';
function move(direction: Direction): string {
    switch (direction) {
        case 'left': return 'left';
        case 'right': return 'right';
    }
}
