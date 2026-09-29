declare function run(): void;
declare function cleanup(): void;
declare function complete(): void;
declare function register(callback: () => void): void;
declare const Register: new (callback: () => void) => object;
declare const ready: boolean;
declare const state: number;