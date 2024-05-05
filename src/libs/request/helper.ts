/*
 * @Author: panda
 * @Date: 2021-12-31 09:11:15
 * @LastEditTime: 2022-05-08 14:29:41
 * @LastEditors: panda
 * @Description: 工具函数
 */
import { isObject, isString } from '@/utils/is'
import { useMessage } from '@/hooks/useMessage'
import { ErrorMessageMode } from './types/typeBasic'
import { ContentTypeEnum } from './types/httpEnum'

/**
 * 添加时间戳
 * @param join 控制是否加入时间戳
 * @param restful 是否是restful风格
 * @returns {_t: string}
 */
export function joinTimestamp(join: boolean, restful = false): string | Record<string, any> {
	if (!join) return restful ? '' : {}
	const now = new Date().getTime()
	if (restful) return `?_t=${now}`
	return { _t: now }
}

/**
 * @description: 去掉请求参数中的前后空格
 */
export function formatRequestParams(params: Recordable) {
	if (Object.prototype.toString.call(params) !== '[object Object]') return

	for (const key in params) {
		if (isString(key)) {
			const value = params[key]
			if (value) {
				try {
					params[key] = isString(value) ? value.trim() : value
				} catch (error: any) {
					throw new Error(error)
				}
			}
		}
		if (isObject(params[key])) formatRequestParams(params[key])
	}
}

export const errorCode = {
	400: '错误请求，未找到该资源',
	401: '登录状态失效，请重新登录！',
	403: '拒绝访问',
	404: '请求错误,未找到该资源',
	405: '请求方法未允许',
	408: '请求超时',

	500: '程序小哥正在抢修，请稍等~',
	501: '网络未实现',
	502: '网络错误',
	503: '服务不可用',
	504: '网络超时',
	505: 'http版本不支持该请求'
}

// 通过状态提示对应的信息
const { createMessage, createConfirmModal } = useMessage()
export function checkStatus(code: number, msg: string, errorMessageMode: ErrorMessageMode = 'message') {
	const errMessage = errorCode[code as keyof typeof errorCode] || msg || '未知错误'
	if (errorMessageMode === 'modal') createConfirmModal('sys.api.errorTip', errMessage)
	else if (errorMessageMode === 'message') createMessage.error(errMessage)
}

/**
 * 把对象参数格式化到url后面
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  const obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
	let parameters = ''
	for (const key in obj) {
		parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
	}
	parameters = parameters.replace(/&$/, '')
	return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * 合并对象 (target中的值会直接覆盖src中的值)
 * @param src 需要合并的对象
 * @param target 目标对象
 * @returns 返回和并后的数据对象
 */
export function deepMerge(src: Recordable = {}, target: Recordable = {}) {
	let key: string
	for (key in target) {
		src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
	}
	return src
}

// 默认配置 (多个平台对接，可考虑方法返回数据)
export const defConf = {
	authenticationScheme: '',
	timeout: 10 * 1000,
	// baseURL: '', // baseURL 是axios自带参数与apiUrl设置其中一个即可
	headers: { 'Content-Type': ContentTypeEnum.JSON },
	// 配置项，下面的选项都可以在独立的接口请求中覆盖
	requestOptions: {
		// 所有接口通用部分，可用做ng跳转
		prefixUrl: import.meta.env.VITE_GLOB_API_URL,
		// 默认将prefix 添加到url
		joinPrefix: true,
		// 需要对返回数据进行处理
		isTransformRequestResult: true,
		// post请求的时候添加参数到url
		joinParamsToUrl: false,
		// 格式化提交参数
		isFormatParams: true,
		// 消息提示类型
		errorMessageMode: 'message',
		// 接口地址
		apiUrl: '',
		// 是否加入时间戳
		isJoinTimestamp: true,
		// post的时候区分相同接口时加上时间戳
		isJionTimestampPost: false,
		// get请求是否允许重复请求
		ignoreCancelToken: false,
		// 是否返回原生数据
		isReturnNativeResponse: false,
		// 是否在头部添加token
		isJionToken: true,
		// 是否区分环境运行
		isEnv: true
	}
}
