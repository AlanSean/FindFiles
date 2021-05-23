import { UnaryFunction } from "types";
import { identity } from "./identity";
export function pipe(){
  
}
export function pipeFromArray<T, R>(operations: UnaryFunction<T, R>[]) :UnaryFunction<T, R> {
  if (operations.length === 0) {
    return identity  as UnaryFunction<any, any>;
  }
  if (operations.length === 1) {
    return operations[0];
  }
  return function piped(input:T):R {
    return operations.reduce((prev: any, fn: UnaryFunction<T, R>)  => fn(prev), input as any);
  };
}