import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  publicDir: "./src/assets",

  build: {
    outDir: "build",
    assetsDir: "./build/assets",
    rollupOptions: {
      external: ["vue"],
      globals: {
        vue: "Vue",
      },
    },
  },

  server: {
    port: 3060,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3030",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  preview: {
    port: 8080,
  },

  plugins: [
    vue(),
  ],

  rules: {
    "vue/no-unused-vars": "error",
  },
});
