import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        proxy: {
            '/vasa_wo_api': {
                target: process.env.VITE_API_PROXY_TARGET || 'http://117.218.59.130:8080',
                changeOrigin: true,
            },
        },
    },
})
