export interface ZeroFunction<T> {
  (): T;
}
export interface UnaryFunction<T, R> {
  (fileName: T): R;
}