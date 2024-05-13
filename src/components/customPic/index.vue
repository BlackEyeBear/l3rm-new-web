<template>
  <div>{{customPic}}</div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue'
const customPic = ref('customPic')
onMounted(() => {})
</script>
<style lang='scss' scoped></style>