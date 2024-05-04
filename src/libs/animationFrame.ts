// 做动画兼容处理，如果不支持当前动画方法，则使用当前挂载到window上的动画方法
;(function () {
	let lastTime = 0
	const vendors: string[] = ['webkit', 'moz']
	for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		const s1: string = vendors[x] + 'RequestAnimationFrame'
		const s2: string = vendors[x] + 'CancelAnimationFrame'
		const s3: string = vendors[x] + 'CancelRequestAnimationFrame'

		window.requestAnimationFrame = (window as any)[s1]
		window.cancelAnimationFrame = (window as any)[s2] || (window as any)[s3]
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback) {
			const currTime = new Date().getTime()
			const timeToCall = Math.max(0, 16 - (currTime - lastTime))
			const id = window.setTimeout(function () {
				callback(currTime + timeToCall)
			}, timeToCall)
			lastTime = currTime + timeToCall
			return id
		}

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id)
		}
})()
