/*
 * @Author: panda
 * @Date: 2024-05-03 14:52:56
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 14:53:07
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/viteConf/plugins/component.ts
 * @Description: 组件自动导入
 */

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export function configComPlugin() {
	return [
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	]
}
