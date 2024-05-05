import { VAxios } from './Axios'
import { AxiosResponse } from 'axios'
import { setObjToUrlParams, formatRequestParams, checkStatus, defConf, deepMerge } from './helper'
import { joinTimestamp } from './helper'
import { AxiosTransform } from './types/typeTransform'
import { CreateAxiosOptions, RequestOptions, Result } from './types/typeBasic'
import { ResultEnum, RequestEnum } from './types/httpEnum'
// 工具类引入，根据具体项目需要做响应调整
import { isArray, isObject, isString } from '@/utils/is'
import { useMessage } from '@/hooks/useMessage'
const errorResult = '请求失败请重试'
const tokenExpire = '登录过期，请重新登录！'
const { createConfirmModal, createMessage } = useMessage()

const transform: AxiosTransform = {
	// 1、请求之前的参数处理
	beforeRequestHook: (config, options) => {
		// console.log('------------------请求之前的参数处理-------------------')
		// 处理参数或url等数据
		const { apiUrl, joinPrefix, joinParamsToUrl, prefixUrl, isEnv, isFormatParams, isJoinTimestamp = true, isJionTimestampPost } = options
		// 是否添加前缀
		if (joinPrefix) config.url = `/${prefixUrl}${config.url}`
		// 是否根据环境运行
		if (isEnv && !import.meta.env.PROD) config.url = `/${import.meta.env.MODE}${config.url}`
		// 添加固定的ip端口
		if (apiUrl && isString(apiUrl)) config.url = `${apiUrl}${config.url}`

		const params = config.params || {}
		const data = config.data || false
		// 判断参数是什么类型，对象或字符串
		const paramsType = !isString(params)
		// 格式化请求参数
		isFormatParams && data && !isString(data) && formatRequestParams(data)
		// get请求方式处理 get参数取data，其他参数是取params
		if (config.method?.toUpperCase() === RequestEnum.GET) {
			// 添加时间戳，避免缓存拿数据、兼容restful风格
			config.params = paramsType ? Object.assign(params, joinTimestamp(isJoinTimestamp, false)) : config.url + params + `${config.url}${params}${joinTimestamp(isJoinTimestamp, true)}`

			if (!paramsType) config.params = undefined
		}
		// 其他请求方式处理
		else {
			if (paramsType) {
				isFormatParams && formatRequestParams(params)
				const status = Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0
				if (status) {
					config.data = data
					config.params = params
				} else {
					// 非GET请求如果没有提供data，则将params视为data
					config.data = params
					config.params = undefined
				}

				// 支持后端post 时不同参数调统一接口会取消掉相同请求情况
				if (isJionTimestampPost) config.url = setObjToUrlParams(config.url as string, joinTimestamp(isJoinTimestamp, false)) + Math.random().toFixed(2)

				// 把请求参数添加到url后面，一般参数跟url后面用于get请求，除非特殊要求，不推荐get以外的请求参数放url后面
				if (joinParamsToUrl) config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data))
			} else {
				// 兼容restful风格
				config.url = config.url + params
				config.params = undefined
			}
		}
		return config
	},

	// 2、请求之前的拦截，用于处理token等
	requestInterceptors: (config, options) => {
		// console.log('------------------请求之前的拦截-------------------')
		const token = 'xxxx'
		// 判断是否需要token
		if (token && config.headers && (config as Recordable).requestOptions.isJionToken) config.headers.token = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token
		return config
	},

	// 3、发起请求的错误处理
	requestInterceptorsCatch: (error: any) => {
		// console.log('------------------发起请求错误处理-------------------')
		return Promise.reject(new Error(error))
	},

	// 4、响应错误处理
	responseInterceptorsCatch: (error: any) => {
		// console.log('------------------请求响应错误处理-------------------')
		// ?? 空值合并操作符，只有当左侧为null和undefined时，才会返回右侧的数
		const { response, code, message, config } = error || {}
		const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
		const msg: string = response?.data?.error?.message ?? ''
		const err: string = error?.toString?.() ?? ''
		let errMessage = ''
		// 根据返回状态码是否正常
		try {
			if (err?.includes('401')) {
				sessionStorage.clear()
				location.href = '/login'
				errMessage = tokenExpire
			}

			if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) errMessage = '请求超时'

			if (err?.includes('Network Error')) errMessage = '请求错误'

			if (errMessage) {
				if (errorMessageMode === 'modal') createConfirmModal('请求错误，请稍后重试！', errMessage)
				else if (errorMessageMode === 'message') createMessage.error(errMessage)

				return Promise.reject(error)
			}
		} catch (error: any) {
			return new Error(error)
		}

		checkStatus(error?.response?.status, msg, errorMessageMode)

		return Promise.reject(new Error(error))
	},

	// 5、请求返回数据 (可对返回数据进行统一处理)
	responseInterceptors: (res: AxiosResponse<Result>) => {
		// console.log('------------------请求返回的拦截-------------------')
		return res
	},

	// 6、处理请求返回的数据
	transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
		// console.log('------------------请求数据回来后的处理-------------------')
		const { isTransformRequestResult, isReturnNativeResponse } = options
		// 返回原始数据，用于下载或者上传文件或其他特色处理
		if (isReturnNativeResponse) return res
		if (!isTransformRequestResult) return res.data
		if (!res.data) return createMessage.error('请求失败请重试')

		const { code, msg, data } = res.data

		// 如果是未定义的code的错误处理
		const isSuccess = Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS

		// 请求成功后直接返回数据
		if (isSuccess && (isObject(data) || isArray(data))) return data

		// 统一提示错误信息
		if (code === ResultEnum.ERROR || code === ResultEnum.FAILED) {
			createMessage.error(data || msg)
			return Promise.reject(new Error('请求错误，请稍后重试！'))
		}

		// 处理token过期情况
		if (code === ResultEnum.IDENTITY) {
			sessionStorage.clear()
			location.href = '/login'
			createMessage.error(tokenExpire)
			return Promise.reject(new Error(data))
		}

		if (options.errorMessageMode === 'message') {
			createMessage.error(data || msg)
			return Promise.reject(new Error(data))
		}
		// 比较重要的错误
		else if (options.errorMessageMode === 'modal') {
			createConfirmModal('错误提示', data || msg)
			return Promise.reject(new Error(errorResult))
		}

		// 如果有信息，就提示信息，且返回一个promise
		return Promise.reject(new Error(errorResult))
	}
}

// opt：实例化时传入的参数
function createAxios(opt?: Partial<CreateAxiosOptions>) {
	return new VAxios(deepMerge(defConf, { transform }))
}

export const defHttp = createAxios()
