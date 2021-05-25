import { UnaryFunction } from '../types';
export function compose<A, B, C>(
  f: UnaryFunction<B, C>,
  g: UnaryFunction<A, B>
) {
  return function (x: A) {
    return f(g(x));
  };
}


export function identity<T>(x: T): T {
  return x;
}