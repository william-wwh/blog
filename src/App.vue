<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GoTop from './components/gotop/GoTop.vue'
</script>

<template>
  <RouterView />
  <GoTop />
</template>

<style >
body {
  background-color: #f5f5f5;
}
</style>
