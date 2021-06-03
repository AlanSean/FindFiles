import { UnaryFunction, ZeroFunction } from "../types";

export function compose<P0, P1, T1>(
  a: UnaryFunction<P1, T1>,
  b: ZeroFunction<P1> | UnaryFunction<P0, P1>
) {
  return function (args?: P0) {
    return a(b(args));
  };
}
