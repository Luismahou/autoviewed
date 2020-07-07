import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import visualizer from 'rollup-plugin-visualizer';
import sizes from 'rollup-plugin-sizes';

const isProd = process.env.NODE_ENV === 'production';

const defaultOutput = {
  dir: 'dist',
  format: 'iife',
  sourcemap: true,
};

function createPluginList(isProd, name) {
  const basePlugins = [
    typescript(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    resolve(),
    commonjs({ include: 'node_modules/**' }),
  ];
  return isProd
    ? [
        ...basePlugins,
        compiler(),
        visualizer({ filename: `${name}.stats.html`, gzipSize: true }),
        sizes(),
      ]
    : basePlugins;
}

export default [
  {
    input: 'src/background.ts',
    output: defaultOutput,
    plugins: createPluginList(isProd, 'background'),
  },
  {
    input: 'src/content-script.ts',
    output: defaultOutput,
    plugins: createPluginList(isProd, 'content-script'),
  },
  {
    input: 'src/options.tsx',
    output: defaultOutput,
    plugins: createPluginList(isProd, 'options'),
  },
  {
    input: 'src/popup.tsx',
    output: defaultOutput,
    plugins: createPluginList(isProd, 'popup'),
  },
];
