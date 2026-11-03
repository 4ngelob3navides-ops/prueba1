import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'shopify-theme/assets',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.js',
      external: ['vue'],
      output: {
        format: 'iife',
        name: 'CepilloVueLanding',
        globals: {
          vue: 'Vue',
        },
        entryFileNames: 'cepillo-vue-app.js',
        assetFileNames: 'cepillo-vue-[name][extname]',
      },
    },
  },
});

