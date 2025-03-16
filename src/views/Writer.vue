<template>
    <el-form>
        <el-form-item label="标题:">
            <el-input v-model="title" maxlength="60" show-word-limit />
        </el-form-item>
        <el-form-item label="简介:">
            <el-input 
                
                v-model="summary"
                maxlength="100" 
                type="textarea"
                :autosize="{ minRows: 2,maxRows: 3 }"
                show-word-limit
                resize="none" />
        </el-form-item>
        <el-form-item label="内容:">
            <el-input 
                v-model="content" 
                :autosize="{ minRows: 2 }"
                type="textarea"
            />
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ElForm } from 'element-plus'
import { ref,onMounted  } from 'vue'
import { postArticle } from '@/api/article'
const title = ref("")
const summary = ref("")
const content = ref("")
// 查询用户username并提交
const username = ref(null)
onMounted(async ()=>{
    let usernameCookie = await cookieStore.get("username");
    console.log(usernameCookie);
    if(usernameCookie==""){
        router.to("/")
    }
    username.value = usernameCookie
    username.value = username.value.value
})

const onSubmit = () => {
    let data={
        title:title.value,
        summary:summary.value,
        content:content.value,
        username:username.value
    }
    postArticle(data)
        .then((e) =>{
            if(e.data.code == 201){
                alert("发布成功")
            }
        })
}
</script>

<style scoped>
.el-form {
    width: 880px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    border-radius: 5px;
    padding: 40px;
}

.title {
    float: left;
    width: 80px;
    text-align: right;
    margin-right: 20px;
}
</style>