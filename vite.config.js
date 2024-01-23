import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //adding proxy to avoid cors error
  server:{
    proxy:{
      '/api':'https://www.bucketbuybackend.onrender.com'
    }
  },
  plugins: [react()],
})
