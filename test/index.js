const path = require("path");
const { FindFiles }  = require('../_esm5/index.js');

const findFiles = new FindFiles(/\.(jpg|jpeg|webp|png)$/i);

const filesPipe = findFiles.pipe( fileName => {
  console.log(fileName)
  return {
    path: fileName
  }
}).find(path.resolve('./img'));

console.log('filesPipe', filesPipe, path.resolve('./img'))
const files = findFiles.find(path.resolve(__dirname,'./img'));

console.log('files', files, path.resolve(__dirname, './img'))
