import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { cloneDeep } from 'lodash'
import type { CreateAxiosOptions } from './types/typeTransform'
import { AxiosCanceler } from './AxiosCancel'
import { isFunction } from '@/utils/is'
import { RequestOptions, Result, UploadFileParams } from './types/typeBasic'

export class VAxios {
	private axiosInstance: AxiosInstance
	private readonly options: CreateAxiosOptions

	// 创建实例时，构造函数中会执行一次
	constructor(options: CreateAxiosOptions) {
		this.options = options
		this.axiosInstance = axios.create(options)
		this.setupInterceptors()
	}

	// 创建请求实例
	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config)
	}

	// 获取数据处理方法（请求前config处理、请求前拦截器、请求返回拦截器、请求返回数据处理）
	private getTransform() {
		const { transform } = this.options
		return transform
	}

	// 请求实例
	getAxios(): AxiosInstance {
		return this.axiosInstance
	}

	// 重新配置axios
	configAxios(config: CreateAxiosOptions) {
		if (!this.axiosInstance) return
		this.createAxios(config)
	}

	// 设置请求头
	setHeader(headers: any): void {
		if (!this.axiosInstance) return
		Object.assign(this.axiosInstance.defaults.headers, headers)
	}

	// 设置拦截器
	private setupInterceptors() {
		const transform = this.getTransform()
		if (!transform) return
		const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform

		// 创建请求取消实例
		const axiosCanceler = new AxiosCanceler()

		// 发起请求前拦截配置
		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			// 如果开启取消重复请求，则取消重复请求
			const ignoreCancel = !!this.options.requestOptions?.ignoreCancelToken
			!ignoreCancel && axiosCanceler.addPending(config)
			if (requestInterceptors && isFunction(requestInterceptors)) config = requestInterceptors(config, this.options)
			return config
		})

		// 请求错误拦截
		if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

		// 请求返回结果拦截
		this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			res && axiosCanceler.removePending(res.config)
			if (responseInterceptors && isFunction(responseInterceptors)) res = responseInterceptors(res)

			return res
		}, undefined)

		// 请求返回结果错误拦截
		if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
	}

	// 文件上传处理
	uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
		const formData = new window.FormData()
		if (params.data) {
			// console.log(formData)
		}
	}

	get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options)
	}

	post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options)
	}

	put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options)
	}

	delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options)
	}

	// consfig 请求的配置  option 定义接口时的第二个参数，做参数特殊定义，覆盖掉request=>index中的配置
	request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		let conf: CreateAxiosOptions = cloneDeep(config)
		const transform = this.getTransform()
		const { requestOptions } = this.options
		const opt: RequestOptions = Object.assign(cloneDeep(requestOptions), options || {})
		const { beforeRequestHook, catchRequestHook, transformResponseHook } = transform || {}
		if (beforeRequestHook && isFunction(beforeRequestHook)) conf = beforeRequestHook(conf, opt)
		conf.requestOptions = opt

		return new Promise((resovle, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<Result>>(conf)
				.then((res: AxiosResponse<Result>) => {
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							const ret = transformResponseHook(res, opt)
							resovle(ret)
						} catch (err) {
							reject(err || new Error('请求错误'))
						}
					}
				})
				.catch((err: Error) => {
					if (catchRequestHook && isFunction(catchRequestHook)) reject(catchRequestHook(err, opt))
					else reject(err)
				})
		})
	}
}
