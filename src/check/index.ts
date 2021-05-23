import * as fs from 'fs-extra';
export function isDirectory(fileName: string) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
  return false;
}

export function isFile(fileName: string) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
  return false;
}
export function check(fileName?: string, condition?: RegExp) {
  return condition == undefined || fileName == undefined ||  condition.test(fileName);
}

export function fileCheck(condition?: RegExp) {
  return (fileName?:string) => check(fileName,condition)
}
