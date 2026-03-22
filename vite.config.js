import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: { popup: 'index.html' },
    },
  },
  server: {
    // Dev server at extension popup size for accurate preview
    open: true,
  },
})
