<!--
 * @Author: panda
 * @Date: 2024-05-12 13:45:54
 * @LastEditTime: 2024-05-12 13:46:07
 * @LastEditors: panda
 * @FilePath: \l3rm-new-web\src\view\layout\aside\MenuItem.vue
 * @Description: 菜单组件
-->
<template>
  <div>{{menuItem}}</div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
const menuItem = ref('menuItem')
onMounted(() => {})
</script>
<style lang='scss' scoped></style>