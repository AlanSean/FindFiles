import * as fs from 'fs-extra';
import * as path from 'path';
import { pipeFromArray } from './util/pipe';
import { UnaryFunction } from './types';
import { isFile, fileCheck, isDirectory } from './check';

// const subject = new Subject();

export class FindFiles {
  condition?: RegExp;
  factorys: UnaryFunction<string, any>[] = [];
  check: UnaryFunction<undefined | string, boolean>;
  constructor(condition?: RegExp) {
    this.check = fileCheck(condition);
  }

  static create(factorys: UnaryFunction<string, any>[]) {
    const findFiles = new AnonymousFiles();
    findFiles.factorys = factorys;
    return findFiles;
  }

  pipe<T>(...operations: UnaryFunction<string, T>[]) {
    return FindFiles.create(operations);
  }

  find<T>(dirPath: string | string[]) {
    return new AnonymousFiles().find<T>(dirPath);
  }
}

class AnonymousFiles extends FindFiles {
  protected arr = [];
  constructor() {
    super();
  }
  protected recursive<T>(fileName: string) {
    if (!fs.existsSync(fileName)) return;
    const { check } = this;
    isFile(fileName) && check(fileName) && this.add<T>(fileName);
    if (isDirectory(fileName)) {
      const files = fs.readdirSync(fileName);
      for (let val of files) {
        const filepath = path.resolve(fileName, val).replace(/\\/, '/');
        isFile(filepath) && check(filepath) && this.add<T>(filepath);
        isDirectory(filepath) && this.recursive(filepath);
      }
    }
  }

  protected factory<T>(fileName: string): T {
    const factorys = [...this.factorys];
    this.factorys = [];
    return pipeFromArray<string, T>(factorys)(fileName);
  }

  add<T>(fileName: string) {
    const arr = this.arr as T[];
    arr[arr.length] = this.factory<T>(fileName);
  }
  find<T>(dirPath: string | string[]) {
    if (Object.prototype.toString.call(dirPath) === '[object Array]') {
      for (let path of dirPath) {
        this.recursive<T>(path);
      }
    }
    if (typeof dirPath === 'string') {
      this.recursive<T>(dirPath);
    }

    return this.arr as T[];
  }
}
