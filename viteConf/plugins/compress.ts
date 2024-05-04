/*
 * @Author: panda
 * @Date: 2024-05-03 14:52:56
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 15:38:48
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/viteConf/plugins/compress.ts
 * @Description: 文件压缩配置
 */

// URL：https://github.com/anncwb/vite-plugin-compression
import type { Plugin } from 'vite'

import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(compress: 'gzip' | 'brotli' | 'none', deleteOriginFile = false): Plugin | Plugin[] {
	const compressList = compress.split(',')

	const plugins: Plugin[] = []

	if (compressList.includes('gzip')) {
		plugins.push(
			compressPlugin({
				ext: '.gz',
				threshold: 1025 * 100,
				deleteOriginFile
			})
		)
	}
	if (compressList.includes('brotli')) {
		plugins.push(
			compressPlugin({
				ext: '.br',
				threshold: 1025 * 100,
				algorithm: 'brotliCompress',
				deleteOriginFile
			})
		)
	}
	return plugins
}
