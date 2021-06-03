import * as fs from 'fs-extra';
import * as path from 'path';
import { UnaryFunction, ZeroFunction } from './types';
import { fileCheck, isDirectory } from './check';
import { getFilePath, pipeFromArray } from './util/index';

export class FindFiles<T = string> {
  protected check: UnaryFunction<string, undefined | string>;
  constructor(condition?: RegExp) {
    this.check = fileCheck(condition);
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
  private sendPath = getFilePath(this.check, this.next);
  private isClose = false;
  private observers: UnaryFunction<T, void>[] = [];
  constructor() {
    super();
  }
  private recursive(fileName?: string) {
    if (!fileName || !fs.existsSync(fileName)) return;

    this.sendPath(fileName);

    if (isDirectory(fileName)) {
      const files = fs.readdirSync(fileName);
      for (let val of files) {
        const filepath = path.resolve(fileName, val).replace(/\\/, '/');
        this.sendPath(filepath);
        this.recursive(isDirectory(filepath));
      }
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
    if (Object.prototype.toString.call(dirPath) === '[object Array]') {
      for (let path of dirPath) {
        this.recursive(path);
      }
    }
    if (typeof dirPath === 'string') {
      this.recursive(dirPath);
    }

    return this.arr;
  }
}
