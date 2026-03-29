import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minerva — frontend (codename: Roman goddess Minerva).
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})