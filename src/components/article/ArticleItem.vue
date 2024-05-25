<template>
    <a @click="view(id)">
    <el-card class="me-article" :body-style="{ padding: '16px' }">
        <div class="me-article-header">
            <div class="me-article-title">{{ title }}</div>
            <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
            <span class="me-pull-right me-article-count">
                <el-icon><Comment /></el-icon>&nbsp;{{  commentCounts }}
            </span>
            <span class="me-pull-right me-article-count">
                <el-icon><View /></el-icon>&nbsp;{{  viewCount }}
            </span>
        </div>
        <div class="me-artile-description">
            {{ summary }}
        </div>
        <div class="me-article-footer">
            <span class="me-article-username">
                <el-icon><UserFilled /></el-icon><el-tag>{{ username }}</el-tag>
            </span>
            <el-tag v-for="t in tags" :key="t.tagName" type="success">{{ t.tagName }}</el-tag>
            <span class="me-pull-right me-article-count">
                <el-icon><Timer /></el-icon>&nbsp; {{ createDateComputed }}
            </span>
        </div>
    </el-card>
    </a>
</template>

<script setup>
import {computed} from 'vue'
import router from '@/router'
import { Comment, View, UserFilled, Timer} from '@element-plus/icons-vue'
import formatTime from "@/utils/time.js"
const props = defineProps({
    id: Number,
    title: String,
    weight: Number,
    commentCounts: Number,
    viewCount: Number,
    summary: String,
    username: String,
    tags: Array,
    date: String
})
const view = (id) => {
    router.push(`/article/${id}`)
}
const createDateComputed = computed(() => {
    return formatTime( props.date )
})

</script>

<style scoped>
.me-article{
    margin-bottom: 10px;
}
.me-article-header {
    padding-bottom: 10px;
}
.me-article-title {
    font-weight: 600;
}
.me-article-icon{
    padding: 3px 8px;
}
.me-article-count{
    color: #ccc;
    padding-left: 14px;
}
.me-pull-right{
    float: right;
}
.me-article-footer{
    padding-top: 10px;
}
.me-article-description{
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
}
.me-article-username{
    color: #ccc;
    padding-right: 14px;
    font-size: 13px;
}
.el-tag{
    margin-left: 6px;
    color: #67c23a;
    background: #f0f9be;
}
</style>