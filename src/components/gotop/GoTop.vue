<template>
    <transition>
       <div>
            <el-icon :size="30"
                v-show="isShow" 
                @click="goTop" 
                class="go-top">
                <CaretTop />
            </el-icon>
       </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'
import { CaretTop } from '@element-plus/icons-vue'

const isShow = ref(false)
const goTop = () => {
    document.documentElement.scrollTop = 0
}
const handleScroll = () => {
    isShow.value = document.documentElement.scrollTop > 300
}
window.addEventListener('scroll', handleScroll)
</script>

<style scoped>
div{
    position: fixed;
    right: 30px;
    bottom: 60px;
    z-index: 999;
    cursor: pointer;
}
.go-top{
    color: #409EFF;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
}
</style>