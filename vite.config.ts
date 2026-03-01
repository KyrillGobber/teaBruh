import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        VitePWA({
            strategies: 'generateSW',
            srcDir: 'src',
            includeAssets: ['tea-192.png', 'tea-512.png', 'coffee.svg'],
            devOptions: {
                enabled: true,
            },
            workbox: {
                importScripts: ['/sw-custom.js'],
            },
            manifest: {
                name: 'Teabruh',
                short_name: 'Teabruh',
                description: 'Brew tea, bruh!',
                start_url: '/',
                scope: '/',
                display: 'standalone',
                background_color: '#000000',
                theme_color: '#000000',
                orientation: 'any',
                categories: ['food', 'lifestyle', 'utilities'],
                icons: [
                    {
                        src: '/tea-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/tea-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/tea-144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                ],
                screenshots: [
                    {
                        src: '/app-1440p.png',
                        sizes: '2560x1440',
                        type: 'image/png',
                        form_factor: 'wide',
                    },
                    {
                        src: '/app-mobile.png',
                        sizes: '505x915',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
