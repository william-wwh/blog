<template>
    <main>
        <div class="article box">
            <h1>{{data.title}}</h1>
            <el-text size="small">{{data.date}}</el-text>
            <el-text tag="div" class="content">{{data.content}}</el-text>
        </div>
        <div class="commit box" v-show="showComment != ''">
            <div class="item"  v-for="item in showComment">
                <div class="header">
                    <div>{{ item.username }}:</div>
                    <div>{{ item.date }}</div>
                </div>
                <div class="commitContent">
                    {{ item.content }}
                </div>
                <hr>
            </div>
        </div>
        <div class="commit box" v-if="login">
            <div><el-text>添加新回复</el-text></div>
            <hr>
            <el-form>
                <el-input
                    v-model="comment"
                    style="width: 100%"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    placeholder="友善评论"
                />
                <el-button type="primary" @click="commentSubmit()">提交</el-button>
            </el-form>
        </div>
    </main>
    
</template>

<style scoped>

</style>

<script setup>
    import {ref,onMounted } from "vue"
    import {getArticleContent,getComment,postComment} from '@/api/article'
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
        })
    const login = ref()
    let username = null
    onMounted(async ()=>{
        username = await cookieStore.get('username')
        if(username == null){
            login.value = false
        }else{
            login.value = true
        }
    })
    const comment = ref('')
    
    const showComment = ref('')
    getComment(props.id)
        .then((e)=>{
            if( e.data.code == 200){
                showComment.value = e.data.data
            }
        })
    console.log(showComment.value.content.repeat("\n","<br>"))
    console.log( showComment.value.content);
    const commentSubmit = () => {
        let commentData={
            articleId:props.id,
            username:username.value,
            comment:comment.value
        }
        postComment(commentData)
            .then((e) => {
                if(e.data.code = 201){
                    alert("评论发布成功")
                    getComment(props.id)
                        .then((e)=>{
                            if( e.data.code == 200){
                                showComment.value = e.data.data
                            }
                        })
                }
            })
    }
    
</script>

<style scoped>
main{
    margin-top: 80px;
    width: 960px;
}
.article h1{
    margin-bottom: 20px;
}
.article .content{
    margin-top: 20px;
}
.commit{
    margin-top: 20px;
}
.item .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item .header div:nth-child(1){
    font-size: 20px;
}
.commitContent{
    text-indent: 2em;
}
.box{
    width: 100%;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
    background-color: #fff;
}
.el-textarea{
    margin-top: 20px;
}
.el-button{
    margin-top: 10px;
}
</style>