import * as path from "path";
import { FindFiles } from '../src/index';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);


const files = findFiles.find(path.resolve(__dirname,'./img'));

console.log(findFiles)
