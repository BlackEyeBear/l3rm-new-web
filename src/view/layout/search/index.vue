<!--
 * @Author: panda
 * @Date: 2024-05-12 10:33:33
 * @LastEditTime: 2024-05-12 10:43:12
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\view\layout\search\index.vue
 * @Description: header search
-->
<template>
  <div>{{search}}</div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
const search = ref('search')
onMounted(() => {})
</script>
<style lang='scss' scoped></style>