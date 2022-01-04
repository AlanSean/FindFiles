import { Maybe } from '../class/index';
export function entrance(m: string) {
  if (process.platform === 'win32') {
    m = m.replace(/\\/g, '/');
  }

  return Maybe.of(m);
}
