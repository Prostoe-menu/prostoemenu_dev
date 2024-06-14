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
  preview: {
    host: true,
    open: false,
    port: 3000,
  },
  plugins: [react(), svgr(), eslint()],
  resolve: {
    alias: {
      '*': path.resolve(__dirname, './src'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      assets: path.resolve(__dirname, './src/shared/assets'),
      helpers: path.resolve(__dirname, './src/shared/helpers'),
      hooks: path.resolve(__dirname, './src/shared/hooks'),
      test_utils: path.resolve(__dirname, './src/shared/test-utils'),
      utils: path.resolve(__dirname, './src/shared/utils'),
      styles: path.resolve(__dirname, './src/shared/styles'),
      ui: path.resolve(__dirname, './src/shared/ui'),
    },
  },
});
