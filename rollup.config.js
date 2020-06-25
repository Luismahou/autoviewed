import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import visualizer from 'rollup-plugin-visualizer';
import sizes from 'rollup-plugin-sizes';

export default [
  {
    input: 'src/background.ts',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      resolve(),
      compiler(),
      visualizer({ filename: 'background.stats.html', gzipSize: true }),
      sizes(),
    ],
  },
  {
    input: 'build/content-script.js',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: true,
    },
    // plugins: [resolve()],
    plugins: [
      typescript(),
      resolve(),
      compiler(),
      visualizer({ filename: 'content-scripts.stats.html', gzipSize: true }),
      sizes(),
    ],
  },
  {
    input: 'build/options.js',
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      compiler(),
      visualizer({ filename: 'options.stats.html', gzipSize: true, }),
      sizes(),
    ],
  },
]
