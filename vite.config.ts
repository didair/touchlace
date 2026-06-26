import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      containers: '/src/containers',
      lib: '/src/lib',
      services: '/src/services',
      types: '/src/types',
    },
  },
});
