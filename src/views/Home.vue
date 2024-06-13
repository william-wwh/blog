<template>
    <div id="home">
        <base-header :activeIndex="activeIndex"></base-header>
        <RouterView class="me-container" :id="id"/>
    </div>
</template>

<script setup>
    import BaseHeader from "@/components/common/BaseHeader.vue"
    import { ref } from "vue"
    import { RouterView,useRoute } from 'vue-router'

    const props = defineProps({
        id: Number
    });
</script>

<style scoped>
.me-container{
    margin: 100px auto 140px;
}
</style>