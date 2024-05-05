/*
 * @Author: panda
 * @Date: 1984-01-24 16:00:00
 * @LastEditors: panda
 * @LastEditTime: 2024-05-05 09:33:11
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\vite.config.ts
 * @Description: 
 */
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { wrapperEnv } from './viteConf/utils'
import { createVitePlugin } from './viteConf/index'
import { createProxy } from './viteConf/httpProxy'
import { OUTPUT_DIR } from './viteConf/constant'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd()
	const timestamp = new Date().getTime()
	// loadEnv方法检查项目下的所有环境, 输出NODE_ENV和VITE_开头的键值对,  VITE_开头的键值对后面的不会覆盖前面的,  NODE_ENV的值后面的会覆盖前面的。
	const env = loadEnv(mode, root)
	// 处理得到的环境中的变量类型
	const viteEnv = wrapperEnv(env)
	const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
	const isBuild = command === 'build'
	return {
		base: '/',
		plugins: createVitePlugin(viteEnv, isBuild),
		resolve: {
			alias: { '@': resolve(__dirname, 'src'), '#': resolve(__dirname, 'types') },
		},
		server: {
			host: true,
			port: VITE_PORT as unknown as number,
			// https: true,
			proxy: createProxy(VITE_PROXY)
		},
		build: {
			target: 'es2015',
			outDir: OUTPUT_DIR,
			sourcemap: false,
			terserOptions: {
				// 代码压缩项
				compress: {
					// 防止压缩成1/0出现性能问题
					keep_infinity: true,
					// 是否去掉打印
					drop_console: VITE_DROP_CONSOLE as boolean
				}
			},
			// brotliSize: true, // 打包时是否显示压缩文件大小
			chunkSizeWarningLimit: 2000, // 防止压缩后出现很多小文件增加http开销，合理的合并小文件
			rollupOptions: {
				output: {
					chunkFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
					entryFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
					assetFileNames: assetInfo => {
						const arr = ['jpg', 'png', 'svg']
						const fonts = ['ttf', 'woff']
						const name = assetInfo.name?.split('.')[1] || ''
						if (arr.includes(name)) return `static/img/[name]-[hash]-${timestamp}.[ext]`
						else if (fonts.includes(name)) return `static/fonts/[name]-[hash].[ext]`
						return `static/[ext]/[name]-[hash]-${timestamp}.[ext]`
					},

					// 目前最优解决方案
					manualChunks: {
						vuelib: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
						libs: ['lodash-es', 'moment', 'axios'],
						elementIcon: ['@element-plus/icons-vue'],
						elementPlus: ['element-plus']
					}
				}
			}
		},
		define: {},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "src/styles/config.scss";'
				}
			}
		},
		optimizeDeps: {
			// splitChunks: {}
			// exclude: ['vue-demi']
		},
		// 预生产配置
		preview: {
			// port: 8080
		}
	}

})
