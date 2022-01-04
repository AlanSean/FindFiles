import * as fs from 'fs-extra';
import { Maybe, Either } from '../class/index';
import { UnaryFunction } from '../types';
import { compose, identity } from '../util';
import { entrance } from './entrance';

function existsSync(m: Maybe<string>) {
  const val = m.__value;
  return fs.existsSync(val) ? m : Either.of<null>(null);
}

function fileCheck(condition?: RegExp) {
  return function (m: Maybe<string>) {
    return !condition || condition.test(m.__value) ? m : Either.of<null>(null);
  };
}

function maybe(f: UnaryFunction<string, void>) {
  return function (m: Maybe<string>) {
    return f(m.__value);
  };
}

function fileTypeMaybe(
  left: UnaryFunction<Maybe<string>, void>,
  right: UnaryFunction<Maybe<string>, void>
) {
  return function (path: Maybe<string>) {
    const val = path.__value;
    try {
      const stat = fs.statSync(val);

      if (stat.isDirectory()) {
        return left(path);
      }
      if (stat.isFile()) {
        return right(path);
      }
      return Either.of<any>('Not files and folders');
    } catch (error) {
      return Either.of<any>(error);
    }
  };
}

function either<T>(
  left: UnaryFunction<Either<any>, void>,
  right: UnaryFunction<Maybe<T>, void>
) {
  return function (m: Either<any> | Maybe<T>) {
    if (m.constructor === Either) {
      return left(m);
    }
    if (m.constructor === Maybe) {
      return right(m);
    }
  };
}

export function searchFile(condition?: RegExp) {
  return function (
    dirPipe: UnaryFunction<string, void>,
    filePipe: UnaryFunction<string, void>
  ) {
    const log = (error: Either<any>) => console.log('error:', error.__value);
    const entry = compose(existsSync, entrance);
    const check = compose(either(identity, maybe(filePipe)), fileCheck(condition));
    const dirOrFilePipe = fileTypeMaybe(maybe(dirPipe), check);
    const result = compose(either(log, dirOrFilePipe), entry);
    return result;
  };
}
