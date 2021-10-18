import { task, src, series } from 'gulp';
import * as del from 'del';
import { dist } from '../config';

function cleanDirs() {
  console.log(dist);
  return del([`${dist}/**/*`]);
}

task('clean:dirs', cleanDirs);
task('clean:bundle', series('clean:dirs'));
