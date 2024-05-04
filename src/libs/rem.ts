/*
 * @Author: panda
 * @Date: 2021-05-25 15:45:10
 * @LastEditTime: 2022-03-28 10:28:10
 * @LastEditors: panda
 * @Description: 设置当前单位
 */
import { os } from '@/utils/common'
;(function (doc, win) {
	const docEl = win.document.documentElement
	const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
	const { isPc } = os()
	const refreshRem = () => {
		const clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth
		const clientHeight = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
		if (isPc) {
			// 设计图宽高尺寸/默认字体大小
			const options = { baseFontSize: 30, psdWidth: 1920, psdHeight: 1080 }

			// 按最小宽或高计算比例
			const scale = Math.min(clientWidth / options.psdWidth, clientHeight / options.psdHeight)
			docEl.style.fontSize = (scale * options.baseFontSize).toFixed(1) + 'px'
		} else {
			// 设计图按750*xxx计算
			docEl.style.fontSize = ((16 * clientWidth) / 375).toFixed(1) + 'px'
		}
	}

	if (!doc.addEventListener) return
	win.addEventListener(resizeEvt, refreshRem, false)
	doc.addEventListener('DOMContentLoaded', refreshRem, false)
	refreshRem()
})(document, window)
