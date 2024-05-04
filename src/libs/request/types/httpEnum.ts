/*
 * @Author: panda
 * @Date: 2021-08-26 14:07:17
 * @LastEditTime: 2021-12-31 22:51:13
 * @LastEditors: panda
 * @Description: 请求常量枚举
 */
/**
 * @description: 状态设置
 */
export enum ResultEnum {
	SUCCESS = 1,
	FAILED = 0,
	ERROR = -1,
	IDENTITY = 401,
	TYPE = 'success'
}

/**
 * @description: 请求方法名
 */
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

/**
 * @description:  请求类型
 */
export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// form-data qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  upload
	FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
