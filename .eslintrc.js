/*
 * @Author: panda
 * @Date: 2022-04-08 09:18:13
 * @LastEditTime: 2022-05-22 10:30:30
 * @LastEditors: panda
 * @Description:
 */
// - 0: off
// - 1: warn
// - 2: error
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
	rules: {
		// ↓禁止使用any类型
		'@typescript-eslint/no-explicit-any': 'off',
		// ↓对自定义事件名称强制使用特定的大小写
		'vue/custom-event-name-casing': 'off',
		// ↓对文件名进行校验
		'vue/multi-word-component-names': [
			'off',
			{
				// 对index不校验
				ignores: ['index']
			}
		],
		// ↓对属性或方法校验
		'vue/attribute-hyphenation': [
			'error',
			'never',
			{
				ignore: ['custom-prop']
			}
		]
	}
}
