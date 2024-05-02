<template>
    <el-container>
        <el-main class="me-articles">
            <ArticleItem v-for="article in articles" :key="article.id" v-bind="article"></ArticleItem>
        </el-main>
        <el-aside>Aside</el-aside>
    </el-container>
</template>


<script setup>
import { reactive } from 'vue'
import ArticleItem from '@/components/article/ArticleItem.vue'
const articles = reactive([
    {
        id: 1,
        weight: 1,
        title: '文章标题0',
        commentCounts: 100,
        viewCounts: 100,
        summary: "概要11",
        author: "作者0",
        tags:[{"tagName":"vue"}],
        createDate: '2024-05-01',
    },
    {
        id: 2,
        weight: 1,
        title: '文章标题1',
        commentCounts: 200,
        viewCounts: 300,
        summary: "概要22",
        author: "作者1",
        tags:[{"tagName":"H5"}],
        createDate: '2024-05-02 19:14',
    },
    {
        id: 3,
        weight: 4,
        title: '文章标题2',
        commentCounts: 210,
        viewCounts: 320,
        summary: "概要33",
        author: "作者2",
        tags:[{"tagName":"CSS"}],
        createDate: '2024-05-02',
    },
])
</script>

<style scoped>
.el-container{
    width: 960px;
}
.el-main{
    padding: 0;
    line-height: 16px;
}
.el-aside{
    margin-left: 20px;
    width: 260px;
}
</style>