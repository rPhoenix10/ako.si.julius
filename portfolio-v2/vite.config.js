import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ako.si.julius",
  server: {
    port: 5273,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})