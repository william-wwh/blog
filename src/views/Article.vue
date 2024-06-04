<template>
    <main>
        <el-space direction="vertical">
            <h1>{{data.title}}</h1>
            <el-text size="small">{{data.date}}</el-text>
            <el-text >{{data.content}}</el-text>
        </el-space>
    </main>
    
</template>

<style scoped>

</style>

<script setup>
    import {ref} from "vue"
    import {getArticleContent} from '@/api/article'
    const data = ref("")
    const props = defineProps({
        id:Number
    })
    getArticleContent(props.id)
        .then(res => {
            console.log(res.data.data);
            if (res.data.code === 201) {
                data.value = res.data.data;
            }
        }
        )
</script>

<style scoped>
main{
    margin-top: 80px;
    width: 960px;
    padding: 16px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
    border-radius: 5px;
}
h1{
    margin-bottom: 20px;
}
</style>