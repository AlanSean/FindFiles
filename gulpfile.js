'use strict';

const path = require('path');

const projectDir = __dirname;
const tsconfigPath = path.join(projectDir, './gulp/tsconfig.json');

require('ts-node').register({
  project: tsconfigPath
});

require('./gulp/gulpfile');