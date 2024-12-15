import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Add CommonJS support
  ],
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.js', // Explicit alias for jQuery
    },
  },
  define: {
    'global': 'window',
  },
});
