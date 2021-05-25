import * as fs from 'fs-extra';
import * as path from 'path';
import { pipeFromArray } from './util/pipe';
import { UnaryFunction } from './types';
import { isFile, fileCheck, isDirectory } from './check';

// const subject = new Subject();

export class FindFiles<T = string> {
  condition?: RegExp;
  factorys: UnaryFunction<string, T>[] = [];
  check: UnaryFunction<string, undefined | string>;
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
  protected arr: T[] = [];
  constructor() {
    super();
  }
  protected recursive(fileName?: string) {
    if (!fileName || !fs.existsSync(fileName)) return;

    const { check } = this;

    this.next(check(fileName));

    if (isDirectory(fileName)) {

      const files = fs.readdirSync(fileName);

      for (let val of files) {

        const filepath = path.resolve(fileName, val).replace(/\\/, '/');
        this.next(check(filepath));
        this.recursive(isDirectory(filepath));
        
      }
    }
  }

  protected factory(fileName: string): T {
    const factorys = [...this.factorys];
    return pipeFromArray<string, T>(factorys)(fileName);
  }
  subscribe(){

  }
  next(fileName?: string) {
    if(!fileName) return;
    const arr = this.arr;
    arr[arr.length] = this.factory(fileName);
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
