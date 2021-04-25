import base from './rollup.config.base';
import { resolve } from 'path';
import pkg from '../package.json';

export default {
  ...base,
  output: {
    file: resolve(__dirname, '../', pkg.main),
    name: pkg.name,
    format: 'cjs',
    // sourcemap: true,
    banner: '#!/usr/bin/env node\n',
  },
  external: ['commander'], // <-- suppresses the warning
  // plugins:[]
};
