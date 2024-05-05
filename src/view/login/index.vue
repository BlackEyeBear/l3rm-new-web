<!--
 * @Author: panda
 * @Date: 2024-05-05 10:39:15
 * @LastEditTime: 2024-05-05 17:13:52
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\view\login\index.vue
 * @Description: 
-->
<template>
	<div>login</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/store/login'
const store = useStore()

onMounted(() => {
	console.log(store, '-----')
	store.LoginIn({ username: 'xionglei', password: 'lianche58' })
})
</script>
<style lang="scss" scoped></style>
