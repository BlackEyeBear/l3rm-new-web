import { isFunction } from '@/utils/is'
import axios, { AxiosRequestConfig, Canceler } from 'axios'

// 用于存储每个请求和取消请求
let pendingMap = new Map<string, Canceler>()
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')
export class AxiosCanceler {
	// 添加请求
	addPending(config: AxiosRequestConfig) {
		this.removePending(config)
		const url = getPendingUrl(config)
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) pendingMap.set(url, cancel)
			})
	}

	// 移除某一个带处理的标识符
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config)
		if (pendingMap.has(url)) {
			// 如果有一个标识符是待处理状态，那么就需要移除当前请求
			const cancel = pendingMap.get(url)
			cancel && cancel(url)
			pendingMap.delete(url)
		}
	}

	// 移除所有带处理的标识符
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel()
		})
		pendingMap.clear()
	}

	// 重置当前请求列队
	reset(): void {
		pendingMap = new Map<string, Canceler>()
	}
}
