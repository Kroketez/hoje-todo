import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths so the build works under any GitHub Pages sub-path.
  base: './',
  plugins: [react()],
})
