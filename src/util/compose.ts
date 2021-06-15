import { UnaryFunction, ZeroFunction } from '../types';

export function compose<P1, T1>(
  a: UnaryFunction<P1, T1>,
  b: ZeroFunction<P1>
): () => T1;
export function compose<P0, P1, T1>(
  a: UnaryFunction<P1, T1>,
  b: UnaryFunction<P0, P1>
): (x0: P0) => T1;
export function compose(a: any, b: any) {
  if (a.length == 0 || arguments.length == 0) {
    throw new Error('compose requires at least one argument');
  }
  if (b.length === 0) {
    return function () {
      return a(b());
    };
  } else {
    return function (x0: any) {
      return a(b(x0));
    };
  }
}

// export function compose<P0, P1, T1>(a, b) {
//   return function (args) {
//     return args === undefined ?  a(b()) : a(b(args));
//   };
// }
