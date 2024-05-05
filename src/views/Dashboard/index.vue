<!--
 * @Author: panda
 * @Date: 2024-05-04 22:04:23
 * @LastEditTime: 2024-05-05 09:51:53
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\views\Dashboard\index.vue
 * @Description: Dashboard
-->
<template>
	<div>123</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { login } from '@/api/user/login'
onMounted(() => {
	login({ username: 'admin2', password: 'lianche582' }).then(res => {
		console.log(res)
	})
})
</script>
<style lang="scss" scoped></style>
