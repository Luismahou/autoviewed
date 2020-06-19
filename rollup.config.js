import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import sucrase from '@rollup/plugin-sucrase';
import { terser } from 'rollup-plugin-terser';

import * as react from 'react';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

function createSucrasePlugin() {
  return sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  });
}

export default [
  {
    input: 'build/background.js',
    output: {
      file: 'dist/background.js',
      format: 'iife',
    },
    plugins: [resolve(), terser()],
  },
  {
    input: 'build/content-script.js',
    output: {
      file: 'dist/content-script.js',
      format: 'iife',
    },
    plugins: [resolve()],
    // plugins: [resolve(), terser()],
  },
  {
    input: 'build/options.js',
    output: {
      file: 'dist/options.js',
      format: 'iife',
    },
    plugins: [
      replace({'process.env.NODE_ENV': JSON.stringify('development')}),
      resolve(),
      commonjs({
        include: 'node_modules/**',
        // namedExports: {
        //   react: Object.keys(react),
        //   'react-is': Object.keys(reactIs),
        //   'prop-types': Object.keys(propTypes),
        // }
      }),
      // terser(),
    ],
  },
]
