import { Functor } from './Functor';
import { UnaryFunction } from '../types';
//容器
export class Either<T> extends Functor<T> {
  static of<T>(value: T) {
    return new Either(value);
  }
  map(fn: UnaryFunction<T, T>): Either<T> {
    return this;
  }
}