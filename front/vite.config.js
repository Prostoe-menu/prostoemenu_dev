import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      helpers: '/src/helpers',
      hooks: '/src/hooks',
      images: '/src/images',
      pages: '/src/pages',
      store: '/src/store',
      test_utils: '/src/test-utils',
      utils: '/src/utils',
      vendor: '/src/vendor',
    },
  },
});
