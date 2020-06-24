import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
// import sucrase from '@rollup/plugin-sucrase';
import { terser } from 'rollup-plugin-terser';
// import visualizer from 'rollup-plugin-visualizer';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

// import * as react from 'react';
// import * as reactIs from 'react-is';
// import * as propTypes from 'prop-types';

// function createSucrasePlugin() {
//   return sucrase({
//     exclude: ['node_modules/**'],
//     transforms: ['typescript'],
//   });
// }

export default [
  {
    input: 'build/background.js',
    output: {
      file: 'dist/background.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      terser(),
      // visualizer({ filename: 'background.stats.html', gzipSize: true }),
      sizeSnapshot({ matchSnapshot: true }),
    ],
  },
  {
    input: 'build/content-script.js',
    output: {
      file: 'dist/content-script.js',
      format: 'iife',
    },
    // plugins: [resolve()],
    plugins: [
      resolve(),
      terser(),
      // visualizer({ filename: 'content-scripts.stats.html', gzipSize: true }),
      sizeSnapshot({ matchSnapshot: true }),
    ],
  },
  {
    input: 'build/options.js',
    output: {
      file: 'dist/options.js',
      format: 'iife',
    },
    plugins: [
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      terser(),
      // visualizer({ filename: 'options.stats.html', gzipSize: true, }),
      sizeSnapshot({ matchSnapshot: true }),
    ],
  },
]
