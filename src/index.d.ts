import { UnaryFunction } from './types';
export declare class FindFiles<T = string> {
    condition?: RegExp;
    factorys: UnaryFunction<string, T>[];
    check: UnaryFunction<string, undefined | string>;
    constructor(condition?: RegExp);
    static create<S = string>(factorys: UnaryFunction<string, S>[]): AnonymousFiles<S>;
    pipe<R>(...operations: UnaryFunction<string, R>[]): AnonymousFiles<R>;
    find(dirPath: string | string[]): T[];
}
declare class AnonymousFiles<T = string> extends FindFiles<T> {
    protected arr: T[];
    constructor();
    protected recursive(fileName?: string): void;
    protected factory(fileName: string): T;
    subscribe(): void;
    next(fileName?: string): void;
    find(dirPath: string | string[]): T[];
}
export {};
