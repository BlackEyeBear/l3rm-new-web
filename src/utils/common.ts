/*
 * @Author: panda
 * @Date: 2024-05-03 16:25:04
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 16:30:22
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/src/utils/common.ts
 * @Description: 公共方法
 * getUuid            -- 生成UUID
 * downloadByUrl      -- 通过url下载
 * getDownloadRulest  -- 接口下载文件
 * getDateRange       -- 获取时间范围（组件绑定的数组转对象）
 * mergeObjSameField  -- 传入两个对象，把有相同字段的值进行覆盖
 * copyMessage        -- 复制字符功能
 * scientificNumber   -- 科学计数法
 * getMaxMin          -- 获取数组最大值和最小值
 * getTargetObject    -- 对象去除不需要的字段或者保留的字段
 * setParamsToObj    -- url参数转成json对象
 * setObjToParams    -- json对象转换成序列化参数
 */
import { isObject } from './is'

/**
 * @description 生成UUID
 * @description 采用时间加上随机数
 * */
export const getUuid = (len?: number) => {
	len = len ? len : 8
	/*默认生成8位随机数*/
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	let uuid = new Date().getTime().toString()
	const charsLen = chars.length
	for (let i = 0; i < len; i++) {
		uuid += chars[parseInt((Math.random() * charsLen).toString())]
	}
	return uuid
}

// 通过url下载
export const downloadByUrl = (url: string) => {
	const dom = document.createElement('a')
	dom.setAttribute('download', url)
	dom.setAttribute('href', url)
	dom.click()
	document.body.removeChild(dom)
}

/**
 * 接口下载文件
 * @param data 文件二进制流
 * @param filename 文件名
 * @param type 类型
 * @returns Promise
 */
export const getDownloadRulest = (data: Blob[], filename: string, type?: { type: string }) => {
	return new Promise((res, rej) => {
		try {
			const blob = new Blob(data, type)
			const downloadElement = document.createElement('a')
			const href = window.URL.createObjectURL(blob) //创建下载的链接
			downloadElement.href = href
			downloadElement.download = decodeURI(filename) //下载后文件名
			document.body.appendChild(downloadElement)
			downloadElement.click() //点击下载
			document.body.removeChild(downloadElement) //下载完成移除元素
			window.URL.revokeObjectURL(href) //释放掉blob对象
			res(true)
		} catch (error) {
			rej(error)
		}
	})
}

/**
 * 组件绑定值转换为传给后端的字段
 * @param date 传入需要转换的时间数组
 * @param props 可自定义返回字段值
 * @returns 返回需要的参数字段
 */
export const getDateRange = (date: [string, string], props?: [string, string]): DateRange | Recordable => {
	if (props && props.length) return { [props[0]]: date[0], [props[1]]: date[1] }
	if (date.length) return { startDate: date[0], endDate: date[1] }
	return { startDate: '', endDate: '' }
}

/**
 * 传入两个对象，把有相同字段的值进行覆盖。
 * @param targetObj 需要映射的对象
 * @param sourceObj 被映射对象
 * @returns 返回映射完成的对象
 * @description: 通常用于表格修改，获取的row有多余的值，但接口又不需要所有字段的情况
 */
export const mergeObjSameField = <T extends Record<string, any>, U extends Record<string, any>>(targetObj: T, sourceObj: U): T => {
	for (const key in targetObj) {
		if (sourceObj[key]) targetObj[key as keyof typeof targetObj] = sourceObj[key] as T[keyof T]
	}
	return targetObj
}

/**
 * 复制字符功能
 * @param value 需要复制的字符
 */
export const copyMessage = (value: string) => {
	const oInput: HTMLInputElement = document.createElement('input')
	oInput.value = value
	document.body.appendChild(oInput)
	oInput.select() // 选择对象
	document.execCommand('Copy') // 执行浏览器复制命令
	oInput.style.display = 'none'
	oInput.remove()
}

/**
 * 科学计数法
 * @param num 传入数字
 * @returns string
 */
export const scientificNumber = (num: number) => {
	if (num == 0 || !num || num < 0) return 0
	const str = num.toString()
	const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
	return str.replace(reg, '$1,')
}

/**
 * 获取数组中的最大值和最小值
 * @param arr 传入数组
 * @returns {max: number, min: number}
 */
export const getMaxMin = (arr: number[]) => {
	const max = parseInt((Math.max.apply(null, arr) / 10).toString()) * 10,
		min = parseInt((Math.min.apply(null, arr) / 10).toString()) * 10
	return { max, min }
}

/**
 * 对象去除不需要的字段或者保留的字段
 * @param {Object} targetObject 被去重的对象
 * @param {Array} propsArray 去掉或者保留的字段名字
 * @param {Boolean} isFilter 是否是去掉字段或者保留字段 默认（false）是去掉传入的字段 反之传入true
 */
export const getTargetObject = (targetObject: Record<string, any>, propsArray: string[], isFilter = false) => {
	if (typeof targetObject !== 'object' || !Array.isArray(propsArray)) {
		throw new Error('参数格式不正确')
	}
	const result: Record<string, any> = {}
	Object.keys(targetObject)
		.filter(key => {
			if (isFilter) return propsArray.includes(key)
			else return !propsArray.includes(key)
		})
		.forEach(key => {
			result[key] = targetObject[key]
		})
	return result
}

/**
 * 判断设备类型、平板、手机、电脑
 * @returns { isTablet: boolean; isPhone: boolean; isAndroid: boolean; isPc: boolean;}
 */
export const os = () => {
	const ua = navigator.userAgent,
		isWindowsPhone = /(?:Windows Phone)/.test(ua),
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
		isAndroid = /(?:Android)/.test(ua),
		isFireFox = /(?:Firefox)/.test(ua),
		// isChrome = /(?:Chrome|CriOS)/.test(ua),
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,
		isPc = !isPhone && !isAndroid && !isSymbian
	return { isTablet, isPhone, isAndroid, isPc }
}

// url参数转Obj对象
export const setParamsToObj = (val: string) => {
	const urlres = val.replace(/&/g, '","').replace(/=/g, '":"')
	const reqDataString = '{"' + urlres + '"}'
	const query = JSON.parse(reqDataString)
	return query
}

// 对象转序列化参数
export const setObjToParams = (val: Recordable): string | undefined => {
	if (!isObject(val)) return
	return JSON.stringify(val).replace(/:/g, '=').replace(/,/g, '&').replace(/{/g, '?').replace(/}/g, '').replace(/"/g, '')
}
