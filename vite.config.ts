import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from "vite-plugin-style-import"
import { hostName } from "./src/utils/config"

// https://vitejs.dev/config/
export default defineConfig({
	base: './', // 将打包地址改成相对路径
	server: {
		host: true,
		port: 8093,
		open: true,
		proxy: {
			'/api': {
				target: 'http://192.168.0.161:9007/', // 王
				// target: hostName,
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					// "brand-color": "red",
					// "font-size-sm": "13px",
					// "font-size-md": "15px",
					// "font-size-lg": "17px",
					// "action-bar-button-danger-color": "#7232dd",
					// "action-bar-button-warning-color": "#3eaf7c",
				}
			}
		}
	},
	resolve: {
		alias: [
			{ find: /^~/, replacement: '' },
			{ find: '@', replacement: '/src' }
		]
	},
	build: {
		outDir: 'slbAppJD', // 打包的目录名
		assetsDir: './assets'
	},
	plugins: [
		react(),
		styleImport({
			libs: [
				{
					libraryName: 'react-vant',
					resolveStyle: name => `react-vant/es/${name}/style/index`
				}
			]
		})
	]
})
