/*
 * @Author: panda
 * @Date: 2024-05-03 14:35:10
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 14:49:02
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/types/global.d.ts
 * @Description: 全局接口
 */

/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

// 使环境配置中的变量使用时可提示
declare interface ViteEnv {
	VITE_PROT: number
	VITE_APP_TITLE: string
	VITE_GLOB_APP_SHORT_NAME: string
	VITE_PROXY: [string, string][]
	VITE_GLOB_API_URL_PREFIX: string
	VITE_GLOB_API_URL: string
	VITE_USE_CDN: boolean
	VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
}

declare interface ImportMetaEnv extends ViteEnv {
	__: unknown
}

interface ImportMeta {
	readonly env: ImportMetaEnv
	VITE_IS_BUILD: boolean
	// readonly development: ImportMetaEnvDev
}

// 允许加载json文件
declare module '*.json' {
	const src: any
	export default src
}

// 分页基础参数
declare interface DefPage {
	total: number
	pageNum: number
	pageSizes: number[]
	pageSize: number
}

declare type Page = Pick<DefPage, 'pageNum' | 'pageSize'>

declare type TargetContext = '_self' | '_blank'

// 时间范围
declare type DateRange = { startDate: string; endDate: string }

declare module 'rollup-plugin-external-globals'

// ts高级类型  https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype
declare type Recordable<T = any> = Record<string, T>

declare type Indexable<T = any> = {
	[key: string]: T
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>
