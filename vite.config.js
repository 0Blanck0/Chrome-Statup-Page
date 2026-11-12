import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // single index.html so the build can be opened directly from the disk (file://)
  plugins: [react(), viteSingleFile()],
  base: '',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
