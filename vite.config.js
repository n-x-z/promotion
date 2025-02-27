import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    loadEnv(mode, process.cwd(), '');
    return {
        base: '/promotion',
        plugins: [
            vue(),
            basicSsl()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            loaderOptions: {
                less: {
                    lessOptions: {
                        modifyVars: {
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        server:{
            host: '127.0.0.1',
            port: 8081,
            open: true,
            https: true,
            proxy: {
                '/promotion_api': {
                    target: 'https://47.117.115.251/promotion_api',
                    // target: 'https://xoffice.dianyutech.com/',
                    changeOrigin: true,
                    ws: false,
                    secure: false, // 关闭SSL/TLS证书验证
                    rewrite: path => path.replace(/^\/promotion_api/, '')
                }
            },

        }
    }
})
