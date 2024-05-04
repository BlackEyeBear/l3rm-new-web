import type { Plugin } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

export function configVisPlugin() {
	if (!process.env.vis) return []
	const visPlugin: Plugin = visualizer({
		open: true,
		gzipSize: true,
		brotliSize: true
	})
	return visPlugin
}
