import * as fs from 'fs-extra';
import { UnaryFunction } from './types';
import { searchFile } from './check';
import { pipeFromArray } from './util/index';

export class FindFiles<T = string> {
  protected condition?: RegExp;
  private arr: T[] = [];
  private searchRule: UnaryFunction<string, void>;
  private closed = false;
  private factorys: UnaryFunction<string, T>[] = [];
  private observers: UnaryFunction<any, void>[] = [];
  constructor(condition?: RegExp) {
    this.condition = condition;
    this.searchRule = searchFile(this.condition)(this.dirPipe, this.next);
  }

  static create<S = string>(
    condition: RegExp | undefined,
    factorys: UnaryFunction<string, S>[]
  ) {
    const findFiles = new FindFiles<S>(condition);
    findFiles.factorys = factorys;
    return findFiles;
  }

  public pipe<R>(...operations: UnaryFunction<string, R>[]) {
    const findFiles = FindFiles.create<R>(this.condition, operations);
    // findFiles.closed = this.closed;
    // findFiles.observers = [...this.observers];
    return findFiles;
  }

  public find(dirPath: string | string[]) {
    return this.runFind(dirPath);
  }

  public subscribe(subscribe: UnaryFunction<any, void>) {
    this.closed = true;
    this.observers.push((result: string) => subscribe(this.factory(result)));
    return {
      unsubscribe: this.unsubscribe,
    };
  }
  unsubscribe(): void {
    this.closed = false;
    this.observers = [];
  }
  private dirPipe = (path: string) => {
    const files = fs.readdirSync(path);
    for (let val of files) {
      const filepath = `${path}/${val}`.replace(/\\/, '/');
      this.searchRule(filepath);
    }
  };

  private factory(fileName: string) {
    const factorys = [...this.factorys];
    return pipeFromArray<string, T>(factorys)(fileName);
  }

  private next = (fileName: string) => {
    const arr = this.arr;
    const result = this.factory(fileName);
    arr[arr.length] = result;
    if (this.closed) {
      const copy = this.observers.slice();
      for (const observer of copy) {
        observer(fileName);
      }
    }
  };

  private runFind(dirPath: string | string[]) {
    this.arr = [];
    if (Object.prototype.toString.call(dirPath) === '[object Array]') {
      for (let path of dirPath) {
        this.searchRule(path);
      }
    }
    if (typeof dirPath === 'string') {
      this.searchRule(dirPath);
    }
    return this.arr;
  }
}
