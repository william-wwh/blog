<template>
    <div>
        <ArticleItem v-for="article in articles" :key="article.id" v-bind="article"></ArticleItem>
        <div style="height: 90px;margin-top: 10px;z-index: 1;"  v-loading="loading" element-loading-text="加载中...">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ArticleItem from "@/components/article/ArticleItem.vue";
import {getArticleList} from "@/api/article"
const loading = ref(false);

const index = ref(1);
const articles = ref([]);
const noData = ref(false)
const getArticles  = () => {
    if (loading.value || noData.value) return    // 正在加载与没有数据直接跳出
    loading.value = true;
    getArticleList(index.value)
        .then(res => {
            if (res.status === 200) {
                noData.value = res.data.noData   // 如果没有了数据 设置为true
                const data = res.data.data;
                if (data.length === 0) {
                    loading.value = false;
                    return
                }
                articles.value = [...articles.value, ...data];
                loading.value = false;
                index.value++;
            }
            
        })
        .catch(err => {
            console.log(err);
        })
}
// 暴露getArticles供外部调用
defineExpose({ getArticles });
</script>

<style scoped></style>