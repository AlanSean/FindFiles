import { task, src, series } from 'gulp';
import { dist } from '../config';
import * as clean from 'gulp-clean';
import * as deleteEmpty from 'delete-empty';

function cleanOutput() {
  return src(
    [
      `${dist}/**/*.js`,
      `${dist}/**/*.d.ts`,
      `${dist}/**/*.js.map`,
      `${dist}/**/*.d.ts.map`,
    ],
    {
      read: false,
    },
  ).pipe(clean());
}

function cleanDirs(done: () => void) {
  deleteEmpty.sync(`${dist}/`);
  done();
}

task('clean:output', cleanOutput);
task('clean:dirs', cleanDirs);
task('clean:bundle', series('clean:output', 'clean:dirs'));
