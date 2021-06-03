import { UnaryFunction } from '../types';

export function getFilePath<T>(
  f: UnaryFunction<T, T>,
  g: UnaryFunction<T, void>
) {
  return function (path: T) {
    f(path) && g(path);
  };
}
