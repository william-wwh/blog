<template>
    <div class="login">
        <div class="title">注册</div>
        <div class="inputs">
            <div class="inputBox">
                <input type="text" required="required" v-model="username">
                <span>Username</span>
            </div>
            <div class="inputBox">
                <input type="password" required="required" v-model="password" maxlength="33" show-word-limit>
                <span>Password</span>
            </div>
            <div class="inputBox">
                <input type="password" required="required" v-model="passwordAgain" maxlength="33" show-word-limit>
                <span>Password again</span>
            </div>
        </div>
        <el-text type="danger" class="alert" v-html="message"></el-text >
        <div class="btns">
            <div><button class="btn" @click="register" >注册</button></div>
            <div><button class="btn" @click="jumpLogin" >已有账号 返回登录</button></div>
        </div>
    </div>
</template>
   
<script setup>
import { doRegister } from '@/api/user'
import { ref,onMounted } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()

const username = ref('')
const password = ref('')
const passwordAgain = ref('')

const message = ref('&nbsp;')
const alert =ref()

onMounted(() => {
    alert.value = document.querySelector(".alert")
})

const jumpLogin = () => {
    router.push('/login')
}

const register = () =>{
    if( username.value != "" && password.value != "" && passwordAgain.value != ""){
        if(password.value !=passwordAgain.value ){
            if(message.value == "两次密码不一致"){
                alert.value.classList.add("flashing")
                setTimeout(() => {
                    alert.value.classList.remove("flashing")
                }, 500);
            }else{
                message.value="两次密码不一致"
            }
        }else{
            let data = {
                username: username.value,
                password: password.value
            }
            doRegister(data)
                .then((e)=>{
                    if (e.data.code == 201) {
                        message.value="&nbsp;"
                        router.push("/login")
                    }else if(e.data.code == 409){
                        if(message.value == "用户名已存在"){
                            usernameInp.value.classList.add("flashing")
                            setTimeout(() => {
                                usernameInp.value.classList.remove("flashing")
                            }, 500);
                        }else{
                            message.value="用户名已存在"
                        }
                    }
                })

        }
    }else{
        if(message.value == "请输入账号密码"){
            console.log(usernameInp.value);
            usernameInp.value.classList.add("flashing")
            setTimeout(() => {
                usernameInp.value.classList.remove("flashing")
            }, 500);
        }else{
            message.value="请输入账号密码"
        }
    }
}


</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.login{
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    /* height: 300px; */
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 50px;
}
.title{
    font-size: 35px;
    font-weight: 200;
    user-select: none;
    text-align: center;
    width: 100%;
}
.inputs{
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    /* background: #1d2b3a; */
    margin-top: 20px;
    
}
.inputBox{
    position: relative;
    width: 250px;
}
.inputBox input{
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    /* background-color: #1d2b3a; */
    border-radius: 5px;
    outline: none;
    color: #000;
    font-size: 1em;
}
.inputBox span{
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.25);
    text-transform: uppercase;
    transition: 0.5s;
}
.inputBox input:valid ~ span,
.inputBox input:focus ~ span{
    color: #1300df;
    transform: translateX(10px) translateY(-10px);
    font-size: 0.8em;
    padding: 0 10px;
    background: #FFF;
    border-left: 1px solid #1300df;
    border-right: 1px solid #1300df;
    /* letter-
    spacing: 0.2em; */
}
.inputBox input:valid,
.inputBox input:focus{
    border: 1px solid #1300df;
}
.alert{
    margin-top: 5px;
}
.alert.flashing{
    text-shadow: red 0 0 0.1em;
    transition: 0.2s;
}
.btns{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    margin-top: 5px;
    flex-wrap: wrap;
}
.btn{
    width: 250px;
    padding: 10px;
    border: 1px solid #1300df;
    color: #000;
    background-color: #1300df00;
    border-radius: 5px;
    transition: 0.5s;
}
.btn:hover{
    opacity: 1;
    background-color: #1300df;
    color: #fff;
}
</style>