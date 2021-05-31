import { UnaryFunction } from "types";
export declare function pipe(): void;
export declare function pipeFromArray<T, R>(operations: UnaryFunction<T, R>[]): UnaryFunction<T, R>;
