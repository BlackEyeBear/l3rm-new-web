/*
 * @Author: panda
 * @Date: 2024-05-03 14:33:05
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 15:39:46
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/viteConf/index.ts
 * @Description: vite配置文件入口
 */

import type { PluginOption, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { configHtmlPlugin } from './plugins/html'
import { configVisPlugin } from './plugins/visualizer'
import { configComPlugin } from './plugins/component'
import { configCompressPlugin } from './plugins/compress'

export const createVitePlugin = (viteEnv: ImportMetaEnv, isBuild: boolean) => {
	const vitePlugins: (Plugin | Plugin[] | PluginOption)[] = [vue(), vueJsx()]

	// vite-plugin-html # index.html设置
	vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

	// rollup-plugin-visualizer # 打包后体积分析
	vitePlugins.push(configVisPlugin())

	// unplugin-vue-components # 组件自动导入
	vitePlugins.push(...configComPlugin())

	// 区分是否在开发中
	if (isBuild) {
		// rollup-plugin-gzip # 是否开启gzip
		vitePlugins.push(configCompressPlugin(viteEnv.VITE_BUILD_COMPRESS, viteEnv.VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
	}

	return vitePlugins
}
