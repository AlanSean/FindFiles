import { UnaryFunction } from "../types";
export class Functor<T>{
  __value:T;
  constructor(value:T){
    this.__value = value;
  }
  static of<T>(value:T){
    return new Functor(value)
  }
  map(f:UnaryFunction<T,T>){
    return new Functor(f(this.__value));
  }
}