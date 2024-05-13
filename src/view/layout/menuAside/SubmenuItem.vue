<!--
 * @Author: panda
 * @Date: 2024-05-12 13:46:15
 * @LastEditTime: 2024-05-12 13:46:28
 * @LastEditors: panda
 * @FilePath: \l3rm-new-web\src\view\layout\aside\SubmenuItem.vue
 * @Description: 二级菜单
-->
<template>
  <div>{{submenu}}</div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
const submenu = ref('submenu')
onMounted(() => {})
</script>
<style lang='scss' scoped></style>