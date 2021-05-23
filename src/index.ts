import * as fs from 'fs-extra';
import * as path from 'path';
import { pipeFromArray } from 'src/util/pipe';
import { UnaryFunction } from 'types';
import { isFile, fileCheck, isDirectory } from 'src/check';

// const subject = new Subject();

export class FindFiles {
  condition?: RegExp;
  factorys: any[] = [];

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

  find<T>(dirPath: string[]) {
    return new AnonymousFiles().find<T>(dirPath);
  }
}

export class AnonymousFiles extends FindFiles {
  protected arr = [];
  constructor() {
    super();
  }
  protected recursive<T>(fileName: string) {
    if (!fs.existsSync(fileName)) return;
    const { check, add } = this;
    isFile(fileName) && check(fileName) && add<T>(fileName);
    if (isDirectory(fileName)) {
      const files = fs.readdirSync(fileName);
      for (let val of files) {
        const filepath = path.resolve(fileName, val).replace(/\\/, '/');
        isFile(filepath) && check(filepath) && add<T>(fileName)
        isDirectory(filepath) && this.recursive(filepath);
      }
    }
  }

  protected factory<T>(fileName:string): T {
    const factorys = [...this.factorys];
    this.factorys = [];
    return pipeFromArray<string,T>(factorys)(fileName);
  }

  add<T>(fileName:string){
    const arr = this.arr as T[];
    arr[arr.length] = this.factory<T>(fileName);
  }
  find<T>(dirPath: string[]) {
    for (let path of dirPath) {
      this.recursive<T>(path);
    }
    return this.arr as T[];
  }
}
