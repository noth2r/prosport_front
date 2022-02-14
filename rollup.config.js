import { getBabelOutputPlugin } from '@rollup/plugin-babel';
const devMode = (process.env.NODE_ENV === 'development');

export default [
    { // ES6 bundle
        input: './src/main.js',
        watch: {
            include: './src/**',
            clearScreen: false
        },
        output: {
            file: './build/bundle.js',
            format: 'es',
            sourcemap: devMode ? 'inline' : false
        }
    },

    { // ES5
      input: './src/main.js',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env']
        })
      ],
      output: {
        file: './build/bundle-es5.js',
        format: 'cjs'
      }
    }
];