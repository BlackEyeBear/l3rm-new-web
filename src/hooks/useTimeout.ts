/*
 * @Author: panda
 * @Date: 2024-05-03 16:27:15
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 16:27:35
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/src/hooks/useTimeout.ts
 * @Description: 防抖节流
 */

import { ref, watch } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'

import { isFunction } from '@/utils/is'
type Fn = (...arg: any) => any
type TimeoutHandle = ReturnType<typeof setTimeout>

export function useTimeoutFn(handle: Fn, wait: number, native = false) {
	if (!isFunction(handle)) {
		throw new Error('handle is not Function!')
	}

	const { readyRef, stop, start } = useTimeoutRef(wait)
	if (native) {
		handle()
	} else {
		watch(
			readyRef,
			maturity => {
				maturity && handle()
			},
			{ immediate: false }
		)
	}
	return { readyRef, stop, start }
}

export function useTimeoutRef(wait: number) {
	const readyRef = ref(false)

	let timer: TimeoutHandle
	function stop(): void {
		readyRef.value = false
		timer && window.clearTimeout(timer)
	}
	function start(): void {
		stop()
		timer = setTimeout(() => {
			readyRef.value = true
		}, wait)
	}

	start()

	tryOnUnmounted(stop)

	return { readyRef, stop, start }
}
