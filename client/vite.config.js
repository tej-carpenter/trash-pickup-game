import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Changed from true to '0.0.0.0'
    port: 5173,
    strictPort: true, // Add this to ensure it uses this port
    watch: {
      usePolling: true
    }
  }
})
