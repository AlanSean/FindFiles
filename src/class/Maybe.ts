import { Functor } from "./Functor";
import { UnaryFunction } from "../types";

//容器
export  class Maybe<T = null | undefined> extends Functor<T>{
  static of<T>(value:T){
    return new Maybe(value)
  }
  isNothing(){
    return (this.__value === null || this.__value === undefined);
  }
  map(fn:UnaryFunction<T,any>):Maybe<T> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
  }
}

