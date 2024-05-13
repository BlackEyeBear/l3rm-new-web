<!--
 * @Author: panda
 * @Date: 2024-05-12 13:17:46
 * @LastEditTime: 2024-05-12 13:18:31
 * @LastEditors: panda
 * @FilePath: \l3rm-new-web\src\view\layout\historyMenuTab\index.vue
 * @Description: 菜单tab
-->
<template>
	<div class="tab-content flex_align">
		<ul class="flex_align">
			<li v-for="item in 4">{{ item }}</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const historyMenuItem = ref('historyMenuItem')
onMounted(() => {})
</script>
<style lang="scss" scoped>
.tab-content {
	height: 40px;
}
</style>
