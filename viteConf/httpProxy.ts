/*
 * @Author: panda
 * @Date: 2021-12-23 09:13:21
 * @LastEditTime: 2022-04-11 11:38:06
 * @LastEditors: panda
 * @Description: 代理配置
 */
import type { ProxyOptions } from 'vite'

// 方法接收的参数
type ProxyList = [string, string, string?][]

// Vite代理所接收对象类型
type ProxyTargetList = Record<string, string | ProxyOptions>

// https类型的URL的匹配正则
const httpsRE = /^https:\/\//

/**
 * 生成Vite代理配置的方法
 */
export function createProxy(list: ProxyList = []) {
	const ret: ProxyTargetList = {}

	for (const [prefix, target, pathRewrite] of list) {
		const isHttps = httpsRE.test(target)
		// https://github.com/http-party/node-http-proxy#options
		ret[prefix] = {
			// 代理至的路径
			target,
			// 默认值：false-将主机标头的来源更改为目标URL
			changeOrigin: true,
			// 如果您想代理websocket
			ws: true,
			rewrite: path => (pathRewrite ? path.replace(new RegExp(`^${prefix}`), '/test') : path.replace(new RegExp(`^${prefix}`), '')),
			// https设置
			...(isHttps ? { secure: false } : {})
		}
	}

	return ret
}
