import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// `base` deve casar com o path do GitHub Pages: luishpalacio.github.io/portifolio/
export default defineConfig({
  base: '/portifolio/',
  plugins: [react()],
});
