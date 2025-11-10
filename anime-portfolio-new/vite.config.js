import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for the anime portfolio project.
 *
 * The project uses React as its primary framework.  The react plugin
 * enables fast refresh during development and compiles JSX syntax.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist'
  }
});