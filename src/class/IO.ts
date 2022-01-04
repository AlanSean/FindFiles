import { ZeroFunction, UnaryFunction } from '../types';
import { compose } from '../util';


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
