import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['tea-192.png', 'tea-512.png', 'coffee.svg'],
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'Teabruh',
                short_name: 'Teabruh',
                description: 'Brew tea, bruh!',
                display: 'standalone',
                background_color: '#000000',
                theme_color: '#000000',
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
                        src: '/tea-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
