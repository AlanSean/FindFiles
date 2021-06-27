# @etanjs/node-find-files
node @etanjs/node-find-files


## install
```
npm install @etanjs/node-find-files
or
yarn add @etanjs/node-find-files
```


## API

### find

`find(dirPath: string | string[]): string[];`

### pipe


```
public pipe<R>(
  fn0: UnaryFunction<string, R>
): FindFiles<R>;
public pipe<T1, R>(
  fn0: UnaryFunction<string, T1>,
  fn1: UnaryFunction<T1, R>
): FindFiles<R>;
public pipe<T1, T2, T3, R>(
  fn0: UnaryFunction<string, T1>,
  fn1: UnaryFunction<T1, T2>,
  fn2: UnaryFunction<T2, T3>,
  fn3: UnaryFunction<T3, R>
): FindFiles<R>;
public pipe<T1, T2, T3, T4, R>(
  fn0: UnaryFunction<string, T1>,
  fn1: UnaryFunction<T1, T2>,
  fn2: UnaryFunction<T2, T3>,
  fn3: UnaryFunction<T3, T4>,
  fn4: UnaryFunction<T4, R>
): FindFiles<R>;
public pipe<T1, T2, T3, T4, R>(
  fn0: UnaryFunction<string, T1>,
  fn1: UnaryFunction<T1, T2>,
  fn2: UnaryFunction<T2, T3>,
  fn3: UnaryFunction<T3, T4>,
  fn4: UnaryFunction<T4, R>,
  ...operations: UnaryFunction<any, any>[]
): FindFiles<R>;


import * as path from "path";
import { FindFiles } from '@etanjs/node-find-files';
const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);
// path => {a: path}
const pipe0 = findFiles.pipe(a => ({a:a}));
//[{a: path}]
const newfiles0 = pipe0.find(path.resolve(__dirname,'./img'));

// path => {a: path} => path
const pipe1 = findFiles.pipe(a => ({a:a}),b => b.a);
//[path]
const newfiles1 = pipe1.find(path.resolve(__dirname,'./img'));
```

### subscribe

```
subscribe = (x0) : void;



import * as path from "path";
import { FindFiles } from '@etanjs/node-find-files';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);
findFiles.subscribe(console.log);
const files = findFiles.find(path.resolve(__dirname,'./img'));

```

## example

```
import * as path from "path";
import { FindFiles } from '@etanjs/node-find-files';

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);


findFiles.subscribe(console.log);
const files = findFiles.find(path.resolve(__dirname,'./img'));



const pipe = findFiles.pipe(a => ({a:a}),b => b.a);

pipe.subscribe(console.log);
const newfiles = pipe.find(path.resolve(__dirname,'./img'));
```