<template>
    <main>
        <el-form label-position="right"  label-width="auto">
            <el-form-item label="原密码:">
                <el-input type="password" v-model="oldPasswd" maxlength="33" show-word-limit show-password/>
            </el-form-item>
            <el-form-item label="新密码:">
                <el-input type="password" v-model="newPasswd" maxlength="33" show-word-limit show-password class="newPasswd" @input="checkEq"/>
            </el-form-item>
            <el-form-item label="再次输入新密码:">
                <el-input type="password" v-model="newPasswdAgain" maxlength="33" show-word-limit show-password class="newPasswd" @input="checkEq" />
            </el-form-item>
            <el-text v-html="alert" :type="typeValue" tag="div" style="text-align: center; width: 100%;"></el-text>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </main>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {doChangePassword} from "@/api/user"
const oldPasswd = ref("")
const newPasswd = ref("")
const newPasswdAgain = ref("")
const username = ref("")
onMounted(async()=>{
    username.value = (await cookieStore.get("username")).value
    console.log(username.value);
})
const alert = ref("&nbsp;")
const typeValue = ref("error")
const checkEq = () =>{
    if(newPasswd.value!=newPasswdAgain.value){
        typeValue.value = "error"
        alert.value = "两次密码不一致"
        console.log(document.getElementsByTagName("button")[0]);
        document.getElementsByTagName("button")[0].disabled = true
        document.getElementsByTagName("button")[0].classList.add("is-disabled")
    }else{
        typeValue.value = "error"
        alert.value = "&nbsp;"
        document.getElementsByTagName("button")[0].disabled = false
        document.getElementsByTagName("button")[0].classList.remove("is-disabled")
    }
}
const submit = () => {
    let data={
        username:username.value,
        oldPasswd:oldPasswd.value,
        newPasswd:newPasswd.value
    }
    doChangePassword(data)
        .then((e)=>{
            if(e.data.code == 201){
                typeValue.value = "success"
                alert.value = "修改成功"
            }else if(e.data.code == 401){
                typeValue.value = "danger"
                alert.value = "密码错误"
            }else if(e.data.code == 409){
                typeValue.value = "danger"
                alert.value = "未找到用户"
            }else{
                console.log(e.data);
                alert.value = e.data
            }
        })
}
</script>

<style scoped>
main{
    width: 880px;
    padding: 40px;
    margin: 0 auto;
    background-color: #fff;
}

</style>