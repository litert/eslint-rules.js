export function createIncrementer(): (value: number) => number {

    return (value) => { return value + 1; };
}
