/*
 * @Author: panda
 * @Date: 2024-05-03 14:52:56
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 15:37:33
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/viteConf/plugins/html.ts
 * @Description: 标题设置
 */

import type { PluginOption } from 'vite'
import {createHtmlPlugin} from 'vite-plugin-html'
import { GLOB_CONFIG_FILE_NAME } from '../constant'
export function configHtmlPlugin(env: ImportMetaEnv, isBuild: boolean) {
	const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env
	const plugins: PluginOption[] = []
	plugins.push(
		createHtmlPlugin({
		minify: isBuild,
		inject: {
			data: {
				title: VITE_GLOB_APP_TITLE
			}
		}
	})
	) 
	return plugins
}
