import { ZeroFunction, UnaryFunction } from '../types';
import * as _ from 'ramda';

function compose<T, R>(
  a: UnaryFunction<T, R>,
  b: ZeroFunction<T> | UnaryFunction<T, T>
) {
  return function (args?: T) {
    return a(b(args));
  };
}
export class IO<T> {
  unsafePerformIO: ZeroFunction<T>;
  constructor(fn: ZeroFunction<T>) {
    this.unsafePerformIO = fn;
  }
  static of<T>(x: T) {
    return new IO<T>(function () {
      return x;
    });
  }
  map<R>(f: UnaryFunction<T, R>) {
    return new IO(compose(f, this.unsafePerformIO));
  }
}
