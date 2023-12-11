import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), svgr(), eslint()],
  resolve: {
    alias: {
      '*': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      helpers: path.resolve(__dirname, './src/helpers'),
      hooks: path.resolve(__dirname, './src/hooks'),
      images: path.resolve(__dirname, './src/images'),
      pages: path.resolve(__dirname, './src/pages'),
      store: path.resolve(__dirname, './src/store'),
      test_utils: path.resolve(__dirname, './src/test-utils'),
      utils: path.resolve(__dirname, './src/utils'),
      vendor: path.resolve(__dirname, './src/vendor'),
    },
  },
});
