import { Maybe } from '../class/index';
import * as fs from 'fs-extra';
import * as _ from 'ramda';
import { UnaryFunction, ZeroFunction } from '../types';
import { identity, compose } from '../util';
// import { UnaryFunction } from '../types';

//-----> fs.existsSync -> statSync -> isFile  -> check
//----->  true ----------> stat-----> false -> isDirectory -> recursive
//------------------------------------------->   false ->  isFile  -> check

function entrance(fileName: string) {
  return Maybe.of(fileName);
}
function existsSync(fileName: Maybe<string>): Maybe<null | string> {
  const val = fileName.__value;
  return fs.existsSync(val) ? fileName : Maybe.of(null);
}
function statSync(files: Maybe<null | string>): Maybe<null | fs.Stats> {
  const val = files.__value;

  return files.isNothing()
    ? Maybe.of<null>(null)
    : Maybe.of<fs.Stats>(fs.statSync(val));
}
function isDirectory(files: Maybe<fs.Stats>) {
  const val = files.__value;

  return files.isNothing() ? Maybe.of(null) : Maybe.of(val.isDirectory());
}
const maybe = function (f: UnaryFunction<fs.Stats | null, fs.Stats | null>) {
  return function (m: Maybe<fs.Stats | null>) {
    return m.isNothing() ? m : f(m.__value);
  };
};
// maybe(identity)
var stats = compose(statSync, existsSync);
var flat = compose(console.log, maybe(identity));
var entry = compose(stats,entrance);

var result = compose(flat,entry);

result('E:/github/FindFile')

// export function isDirectory(fileName: string) {
//   if (existsSync(fileName) && fs.statSync(fileName).isDirectory()) return fileName;
//   return undefined;
// }

export function isFile(fileName: string) {
  if (fs.existsSync(fileName) && fs.statSync(fileName).isFile())
    return fileName;
  return undefined;
}
export function check(fileName?: string, condition?: RegExp) {
  const result =
    condition == undefined || fileName == undefined || condition.test(fileName);
  return result ? fileName : undefined;
}

export function checkRule(condition?: RegExp) {
  return (fileName: string) => check(isFile(fileName), condition);
}

export function fileCheck(condition?: RegExp) {
  return checkRule(condition);
}
