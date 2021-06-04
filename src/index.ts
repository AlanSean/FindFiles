import * as fs from 'fs-extra';
import * as path from 'path';
import { UnaryFunction, ZeroFunction } from './types';
import { searchFile } from './check';
import { getFilePath, pipeFromArray } from './util/index';

export class FindFiles<T = string> {
  protected condition?: RegExp;
  constructor(condition?: RegExp) {
    this.condition = condition;
  }

  static create<S = string>(factorys: UnaryFunction<string, S>[]) {
    const findFiles = new AnonymousFiles<S>();
    findFiles.factorys = factorys;
    return findFiles;
  }

  pipe<R>(...operations: UnaryFunction<string, R>[]) {
    return FindFiles.create<R>(operations);
  }

  find(dirPath: string | string[]) {
    return new AnonymousFiles<T>().find(dirPath);
  }
}

class AnonymousFiles<T = string> extends FindFiles<T> {
  factorys: UnaryFunction<string, T>[] = [];
  private arr: T[] = [];
  private searchRule: UnaryFunction<string, void>;
  private isClose = false;
  private observers: UnaryFunction<T, void>[] = [];
  constructor(condition?: RegExp) {
    super();
    this.searchRule = searchFile(condition)(this.dirPipe, this.next);
  }
  private dirPipe(path: string) {
    const files = fs.readdirSync(path);
    for (let val of files) {
      const filepath = `${path}/${val}`.replace(/\\/, '/');
      this.searchRule(filepath);
    }
  }

  private factory(fileName: string) {
    const factorys = [...this.factorys];
    return pipeFromArray<string, T>(factorys)(fileName);
  }
  subscribe(subscribe: UnaryFunction<T, void>) {
    this.isClose = true;
    this.observers.push(subscribe);
    return {
      unsubscribe: () => {
        this.isClose = false;
      },
    };
  }
  next(fileName: string) {
    const arr = this.arr;
    const result = this.factory(fileName);
    arr[arr.length] = result;
    if (this.isClose) {
      const copy = this.observers.slice();
      for (const observer of copy) {
        observer(result);
      }
    }
  }

  find(dirPath: string | string[]) {
    const searchRule = this.searchRule;
    if (Object.prototype.toString.call(dirPath) === '[object Array]') {
      for (let path of dirPath) {
        searchRule(path);
      }
    }
    if (typeof dirPath === 'string') {
      searchRule(dirPath);
    }

    return this.arr;
  }
}
