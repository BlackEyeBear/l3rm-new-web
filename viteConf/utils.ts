/**
 * 用于转换环境变量中的一些布尔类型、数字字符串等
 * @param envConf 环境变量
 * @returns ImportMetaEnv
 */
export function wrapperEnv(envConf: Recordable): ImportMetaEnv {
	const ret: any = {}

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n')
		// 转布尔类型
		realName = realName === 'true' ? true : realName === 'false' ? false : realName
		// 端口类型转换
		if (envName === 'VITE_PORT') realName = Number(realName)

		if (envName === 'VITE_PROXY')
			try {
				realName = JSON.parse(realName)
			} catch (error) {}

		ret[envName] = realName

		// 处理process上的变量
		if (typeof realName === 'string') {
			process.env[envName] = realName
		} else if (typeof realName === 'object') {
			process.env[envName] = JSON.stringify(realName)
		}
	}
	return ret
}
