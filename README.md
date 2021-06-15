# FindFiles
node FindFiles


## install
```
npm install findfile
or
yarn add findfile
```


## API

### find

`find(dirPath: string | string[]): string[];`

### pipe

`pipe(fn:(x:string) =>T, fn:(x:T) => R, fn:(x:R) => F,..... )`



## example

```
import * as path from "path";
import { FindFiles } from 'findFile';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);

//subscription
findFiles.subscribe(console.log);//'xxxx'
const files = findFiles.find(path.resolve(__dirname,'./img'));
console.log(newfiles);//['xxxxx']

//pipe
const pipe = findFiles.pipe(a => ({a:a}));
//subscription
pipe.subscribe(console.log);//{a:'xxxx'}
const newfiles = pipe.find(path.resolve(__dirname,'./img'));
console.log(newfiles);//[{a:'xxxx'}]
```