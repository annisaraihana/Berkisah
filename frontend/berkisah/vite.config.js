import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://20.51.177.188:8000'
    }
  },
  plugins: [react()],
})
