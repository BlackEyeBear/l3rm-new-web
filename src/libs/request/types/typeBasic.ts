/*
 * @Author: panda
 * @Date: 2021-08-26 14:07:17
 * @LastEditTime: 2022-03-25 14:14:38
 * @LastEditors: panda
 * @Description: 请求配置文件
 */
import { AxiosTransform } from './typeTransform'
import type { AxiosRequestConfig } from 'axios'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
export interface RequestOptions {
	// 接口前缀
	prefixUrl?: string
	// 拼接参数
	joinParamsToUrl?: boolean
	// 格式化请求参数
	isFormatParams?: boolean
	// 是否处理请求结果
	isTransformRequestResult?: boolean
	// 是否返回原生请求头
	isReturnNativeResponse?: boolean
	// 是否加入前缀
	joinPrefix?: boolean
	// 接口地址，留空使用默认的apiUrl
	apiUrl?: string
	// 错误消息提示类型
	errorMessageMode?: ErrorMessageMode
	// 是否添加一个时间戳
	isJoinTimestamp?: boolean
	// post的时候区分相同接口时加上时间戳，否则相同请求会被取消掉
	isJionTimestampPost?: boolean
	// 是否过滤重复请求
	ignoreCancelToken?: boolean
	// 是否在头部添加token
	isJionToken?: boolean
	// 是否区分环境
	isEnv?: boolean
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
	prefixUrl?: string
	transform?: AxiosTransform
	requestOptions?: RequestOptions
}

// 接口返回结果定义
export interface Result<T = any> {
	type?: 'success' | 'error' | 'warning'
	code: number
	msg: string
	data: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
	// 其他参数
	data?: Recordable
	// 参数接口字段名称的文件
	name?: string
	// 文件名
	file: File | Blob
	// 文件名
	filename?: string
	// 其他字段
	[key: string]: any
}
