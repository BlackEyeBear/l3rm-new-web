<template>
	<el-container>
		<el-aside width="200px">Aside</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main>
				<RouterView></RouterView>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
