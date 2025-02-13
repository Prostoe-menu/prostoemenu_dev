import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

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
  plugins: [react(), tsconfigPaths(), svgr(), eslint()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/shared/assets'),
      styles: path.resolve(__dirname, './src/shared/styles'),
    },
  },
});
