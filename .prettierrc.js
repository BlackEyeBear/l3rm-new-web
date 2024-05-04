/*
 * @Author: xionglei
 * @Date: 2022-05-12 09:58:11
 * @LastEditTime: 2022-05-16 14:57:09
 * @LastEditors: xionglei
 * @Description:
 */
module.exports = {
	printWidth: 180, // 换行字符串阈值
	// bracketSpacing: true, // 对象，数组加空格
	jsxBracketSameLine: true, // jsx > 是否另起一行
	eslintIntegration: true, // 开始es校验
	tslintIntegration: true, // 开启ts校验
	singleQuote: true, // 使用单引号代替双引号
	trailingComma: 'none', // 末尾不加逗号
	semi: false, // 句尾不加分号
	useTabs: true, // 是否使用tab缩进
	arrowParens: 'avoid', // 函数省略括号
	endOfLine: 'auto' //检测文件每行结束的格式
}
