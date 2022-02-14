import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import vueTemplateCompiler from 'rollup-plugin-vue-template-compiler'
import buble from 'rollup-plugin-buble'
import css from 'rollup-plugin-css-only'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import html from 'rollup-plugin-html'
import visualizer from 'rollup-plugin-visualizer'

const devMode = process.env.NODE_ENV === 'development'

export default [
  {
    // ESM
    input: './src/main.js',
    watch: {
      include: './src/**',
      clearScreen: false,
    },
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      }),
      nodeResolve(), // подключение модулей node
      commonJs(), // подключение модулей commonjs
      html(), // подключение html файлов
      sizeSnapshot(), // напишет в консоль размер бандла
      terser(), // минификатор совместимый с ES2015+, форк и наследник UglifyES
      visualizer(), // анализатор бандла
      vue({ css: false }),
      vueTemplateCompiler({
        include: '**/*.html',
      }),
      buble(),
      css(),
      externalGlobals({
        vue: 'Vue',
      }),
    ],
    output: {
      file: './build/bundle.js',
      format: 'esm',
      sourcemap: devMode ? 'inline' : false,
    },
  },

  {
    // ES5
    input: './src/main.js',
    plugins: [
      nodeResolve(), // подключение модулей node
      commonJs(), // подключение модулей commonjs
      html(), // подключение html файлов
      sizeSnapshot(), // напишет в консоль размер бандла
      terser(), // минификатор совместимый с ES2015+, форк и наследник UglifyES
      visualizer(), // анализатор бандла
      vue({ css: false }),
      css(),
    ],
    output: {
      file: './build/bundle-es5.js',
      format: 'cjs',
      sourcemap: devMode ? 'inline' : false,
    },
  },
]
