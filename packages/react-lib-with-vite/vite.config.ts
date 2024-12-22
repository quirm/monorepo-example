import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: 'inline',
    emptyOutDir: false, // needed to avoid missing package output on the initial `pnpm dev` of everything
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'lib',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
});
