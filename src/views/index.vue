<template>
    <el-container v-infinite-scroll="handleCurrentChange">
        <el-main class="me-articles">
            <ArticleScrollPage ref="ArticleScrollPageLoad" ></ArticleScrollPage>
        </el-main>
        <el-aside><AsideBar /></el-aside>
    </el-container>
</template>


<script setup>
import { ref,onMounted } from "vue"
import ArticleScrollPage from '@/components/common/ArticleScrollPage.vue'
import AsideBar from "@/components/common/AsideBar.vue";
const ArticleScrollPageLoad = ref(null)
onMounted(()=>{
    ArticleScrollPageLoad.value.getArticles()
})
const handleCurrentChange = ()=>{
    ArticleScrollPageLoad.value.getArticles()
}
</script>

<style scoped>
.el-container{
    width: 960px;
}
.el-main{
    padding: 0;
    line-height: 16px;
    overflow: unset;
}
.el-aside{
    margin-left: 20px;
    width: 260px;
}
</style>