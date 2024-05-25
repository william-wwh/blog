<template>
    <div id="home">
        <base-header :activeIndex="activeIndex"></base-header>
        <RouterView class="me-container" :id="id"/>
    </div>
</template>

<script setup>
    import BaseHeader from "@/components/common/BaseHeader.vue"
    import { ref,watch } from "vue"
    import { RouterView,useRoute } from 'vue-router'

    // 使用 useRoute 获取当前路由
    const route = useRoute()
    const activeIndex = ref(route.path)
    
    // 监听路由变化，更新 activeIndex
    watch(route, (newRoute) => {
        activeIndex.value = newRoute.path
    })
    const props = defineProps({
        id: Number
    });
</script>

<style scoped>
.me-container{
    margin: 100px auto 140px;
}
</style>