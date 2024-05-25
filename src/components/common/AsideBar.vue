<template>
    <el-card :body-style="{ padding: '8px 18px' }">
        <div slot="header" class="me-category-header">
            <span>{{cardHeader}}</span>
        </div>
        <ul class="me-category-list">
            <li v-for="a in articlesHot" @click="view(a.id)" :style="itemStyle" :key="a.id" class="me-category-item">
                {{a.title}}
            </li>
        </ul>
    </el-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import {ref,onMounted} from 'vue'
import {getHotArticleList} from "@/api/article"
defineProps({
    cardHeader: {
        type: String,
        default: "热门文章"
    },
    itemStyle: {
        type: Object,
        default: () => {
            return {
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: "1px solid #eee"
            }
        }
    }
})
const articlesHot = ref([]); //热门文章列表
const getHotArticles  = () => {
    getHotArticleList()
        .then(res => {
            if (res.data.code === 201) {
                const data = res.data.data;
                if (data.length === 0) {
                    return
                }
                articlesHot.value = data;
            }
        })
        .catch(err => {
            console.log(err);
        })
}
onMounted(() => {
    getHotArticles();
});

const router = useRouter()
const view = (id) => {
    router.push({
        path: "/article/" + id
    })
}
</script>

<script>
export default {
    name: "AsideBar"
};
</script>

<style scoped>
.me-category-header {
    font-weight: 600;
    font-size: 16px;
    color: #606266;
    line-height: 24px;
}
.me-category-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.me-category-item {
    padding: 4px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}
.me-category-item:hover {
    color: #409eff;
}
.me-category-item:last-child {
    border-bottom: none;
}
</style>