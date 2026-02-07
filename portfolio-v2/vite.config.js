import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ako.si.julius",
  server: {
    host: true,      // Required: Allows Docker to map the port
    port: 5273,      // Preserves custom port
    open: true,      // Opens browser automatically (when running locally)
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})