import * as path from "path";
import { FindFiles } from 'findFile';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);
interface obj {
  path:string
}
const obj = (fileName:string):{path:string} =>  {
  console.log(fileName)
  return {
    path: fileName
  }
}
const filesPipe = findFiles.pipe<obj>(obj).find(path.resolve('./img'));

console.log('filesPipe', filesPipe, path.resolve('./img'))
const files = findFiles.find(path.resolve(__dirname,'./img'));

console.log('files', files, path.resolve(__dirname, './img'))
