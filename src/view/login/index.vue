<!--
 * @Author: panda
 * @Date: 2024-05-05 10:39:15
 * @LastEditTime: 2024-05-09 22:18:14
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\view\login\index.vue
 * @Description: 登录页面
-->
<template>
	<div>
		<el-button @click="loginFn" type="primary">login</el-button>
		{{ store.userInfo }}
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStoreLogin } from '@/store/login'
import { login } from '@/api/user/login'

const store = useStoreLogin()

const a: LoginParams = { username: 'xionglei', password: 'lianche58' }

const form = ref(a)
function loginFn() {
	login(form.value).then(async res => {
		const { token, userInfo } = res
		await store.setToken(token)
		await store.setUserInfo(userInfo)
	})
}

onMounted(() => {
	// store.LoginIn({ username: 'xionglei', password: 'lianche58' })
})
</script>
<style lang="scss" scoped></style>
