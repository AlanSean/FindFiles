import { dest, task, series, watch } from 'gulp';
import { createProject } from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import { source, dist } from '../config';

const tsModule = createProject('src/tsconfig.json');
function defaultTask() {
  console.info('Watching files..');
  watch([`${source}/**/*.ts`, `${source}/*.ts`], series('build'));
}

function buildPackage() {
  return tsModule
    .src()
    .pipe(tsModule())
    .pipe(dest(`${dist}`));
}

function buildPackageDev() {
  return tsModule
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsModule())
    .pipe(
      sourcemaps.mapSources(
        (sourcePath: string) => './' + sourcePath.split('/').pop()
      )
    )
    .pipe(sourcemaps.write('.', {}))
    .pipe(dest(`${dist}`));
}

task('build', () => buildPackage());
task(`build:dev`, () => buildPackageDev());
task('default', defaultTask);
