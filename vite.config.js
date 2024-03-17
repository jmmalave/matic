import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{find: '@', replacement: path.resolve(__dirname, 'src')}
		]
	},
	/*
	build: {
		rollupOptions: {
			input: {
				index: path.resolve(__dirname, 'index.html'),
				//app: path.resolve(__dirname, 'app.html'),
				//auth: path.resolve(__dirname, 'auth.html'),
			}
		}
	},
	*/
	/*
	server: {
		proxy: {
			'^/json/v1/.*': {
				target: 'http://localhost:8089',
				changeOrigin: true
			},
			'/socket.io/.*': {
				target: 'http://localhost:8089/socket.io',
				ws: true,
				changeOrigin: true
			}
		}
	}
	*/
})
