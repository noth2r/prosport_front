import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  publicDir: './src/assets',

  build: {
    outDir: 'build',
    assetsDir: 'assets',
    // rollupOptions: {},
    dynamicImportVars: dynamicImportVars(),
  },

  server: {
    port: 3060,
    proxy: {
      '/api': {
        target:
          'https://8080-usr9548-prosportfront-x1bp51n3yi4.ws-eu31.gitpod.io/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  preview: {
    port: 8080,
  },

  plugins: [vue()],

  rules: {
    'vue/no-unused-vars': 'error',
  },
})
