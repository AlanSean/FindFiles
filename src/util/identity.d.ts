import { UnaryFunction } from '../types';
export declare function compose<A, B, C>(f: UnaryFunction<B, C>, g: UnaryFunction<A, B>): (x: A) => C;
export declare function identity<T>(x: T): T;
