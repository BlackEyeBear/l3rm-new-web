/*
 * @Author: panda
 * @Date: 2021-09-09 15:57:52
 * @LastEditTime: 2021-12-31 22:57:31
 * @LastEditors: panda
 * @Description: 自定义钩子函数，处理请求情况
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './typeBasic'

export interface CreateAxiosOptions extends AxiosRequestConfig {
	authenticationScheme?: string // 认证方式
	transform?: AxiosTransform
	requestOptions?: RequestOptions
}

// 请求的一些钩子函数
export abstract class AxiosTransform {
	// 请求发起之前函数
	beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

	// 请求之前的拦截器
	requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig

	// 请求之前的拦截器错误处理
	requestInterceptorsCatch?: (error: Error) => void

	// 请求失败处理函数
	catchRequestHook?: (err: Error, options: RequestOptions) => Promise<any>

	// 请求返回后的拦截器
	responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

	// 请求之后的拦截器错误处理
	responseInterceptorsCatch?: (error: Error) => void

	// 请求成功处理函数
	transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any
}
