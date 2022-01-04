import * as path from "path";
import { FindFiles } from '../dist/index';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);


//开启订阅
findFiles.subscribe(console.log);
const files = findFiles.find(path.resolve(__dirname,'./img'));


//处理返回的路径字符串
const pipe = findFiles.pipe(a => ({a:a}),b => b.a);
//处理后再次订阅
pipe.subscribe(console.log);
const newfiles = pipe.find(path.resolve(__dirname,'./img'));
