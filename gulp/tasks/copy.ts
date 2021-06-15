import { task, src, dest } from 'gulp';

task('copy', function () {
  return src(['package.json', 'src/tsconfig.json', 'README.md']).pipe(
    dest('node_modules/find-file/')
  );
});
