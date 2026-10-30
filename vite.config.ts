import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {alias: {'@/remotion': resolve(import.meta.dirname, 'src/remotion')}},
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.e2b.app', 'localhost', '127.0.0.1'],
  },
  build: {outDir: 'build-review', emptyOutDir: true},
});
