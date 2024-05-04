import { defineStore } from 'pinia'

export const useStore = defineStore('common', {
	state: () => ({
		test: 2
	}),
	getters: {
		counr(state) {
			return state.test * 2
		}
	},
	actions: {
		cont() {
			this.test += 1
		}
	}
})
