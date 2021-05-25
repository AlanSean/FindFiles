import * as fs from 'fs-extra';
// import { UnaryFunction } from '../types';
export function isDirectory(fileName: string) {
  if (fs.existsSync(fileName) && fs.statSync(fileName).isDirectory()) return fileName;
  return undefined;
}

export function isFile(fileName: string) {
  if (fs.existsSync(fileName) && fs.statSync(fileName).isFile()) return fileName;
  return undefined;
}
export function check(fileName?: string, condition?: RegExp) {
  const result = condition == undefined || fileName == undefined ||  condition.test(fileName);
  return result ? fileName : undefined;
}

export function checkRule(condition?: RegExp) {
  return (fileName:string) => check(isFile(fileName),condition)
}

export function fileCheck(condition?: RegExp) {
  return checkRule(condition)
}