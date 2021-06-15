export const source = 'src';
export const distId = process.argv.indexOf('--dist');
export const dist = distId < 0 ? 'dist' : process.argv[distId + 1];
