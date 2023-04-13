import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],

  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/shared/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@libs': path.resolve(__dirname, './src/shared/libs'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@styles': path.resolve(__dirname, './src/shared/styles'),
      '@helpers': path.resolve(__dirname, './src/shared/helpers'),
      '@interfaces': path.resolve(__dirname, './src/shared/interfaces'),
    },
  },
});
