import { task, src, dest } from 'gulp';
import { dist } from '../config';
task('copy', function () {
  return src(['package.json', 'src/tsconfig.json', 'README.md']).pipe(
    dest(dist)
  );
});
