<!--
 * @Author: panda
 * @Date: 2024-05-05 15:06:08
 * @LastEditTime: 2024-05-12 17:08:08
 * @LastEditors: panda
 * @FilePath: \l3rm-new-web\src\view\layout\index.vue
 * @Description: 
-->
<!--
 * @Author: panda
 * @Date: 2024-05-05 15:06:08
 * @LastEditTime: 2024-05-12 13:59:35
 * @LastEditors: panda
 * @FilePath: \l3rm-new-web\src\view\layout\index.vue
 * @Description: 页面布局入口
-->
<template>
	<el-container>
		<el-aside :width="!isCollapse ? '200px' : '64px'">
			<div class="logo flex_align_justify">
				<img src="../../assets/vue.svg" alt="#" />
				<h3 v-if="!isCollapse">8号车</h3>
			</div>
			<MenuAside />
		</el-aside>
		<el-container>
			<el-header>
				<div class="flex_align_between header pl8 pr8">
					<div class="flex_align h100">
						<p @click="toggleCollapse" class="c_p collapse">
							<el-icon v-if="isCollapse"><Expand /></el-icon>
							<el-icon v-else><Fold /></el-icon>
						</p>
						<el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :key="item.path" v-for="item in matched.slice(1, matched.length)">{{ item.meta.title }}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="flex_align">
						<Search />
						<el-dropdown>
							<span class="flex_align">
								<CustomPic />
								<span style="margin-left: 5px">{{ userInfo.nickname }}</span>
								<el-icon><ArrowDown /></el-icon>
							</span>
							<template #dropdown>
								<el-dropdown-menu class="dropdown-group" slot="dropdown">
									<el-dropdown-item @click.native="toPerson" icon="User">个人信息</el-dropdown-item>
									<el-dropdown-item @click.native="loginOut" icon="SoldOut">登 出</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</div>
				<HistoryMenuTab></HistoryMenuTab>
			</el-header>
			<el-main>
				<RouterView></RouterView>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MenuAside from './menuAside/index.vue'
import Search from './search/index.vue'
import HistoryMenuTab from './historyMenuTab/index.vue'

const { matched } = useRoute()
const userInfo = ref({ nickname: 'admin' })

// const matched = computed(() => matched)

const isCollapse = ref(false)
function toggleCollapse() {
	isCollapse.value = !isCollapse.value
}
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

function toPerson() {}
function loginOut() {}
</script>
<style lang="scss" scoped>
.el-container {
	height: 100%;
	width: 100%;
}
.el-aside {
	background: #fff;
}
.logo {
	height: 50px;
	color: #fff;
}
.el-header {
	background: #fff;
	height: 90px;
	padding: 0 !important;
	.header {
		height: 50px;
		border-bottom: 1px solid #eee;
		.collapse {
			font-size: 20px;
			color: #666;
		}
	}
}
</style>
