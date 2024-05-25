<template>
    <div class="login">
        <div class="title">登录</div>
        <div class="inputs">
            <div class="inputBox">
                <input type="text" required="required" v-model="username">
                <span>Username</span>
            </div>
            <div class="inputBox">
                <input type="password" required="required" v-model="password">
                <span>Password</span>
            </div>
        </div>
        <el-text type="danger" class="alert" v-html="message"></el-text >
        <div class="btns">
            <div><button class="btn" @click="login">登录</button></div>
            <div><button class="btn" @click="jumpLogin">首次使用 点我注册</button></div>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { doLogin } from '../api/user';
import { useRouter } from "vue-router";
const router = useRouter()

const username = ref('')
const password = ref('')

const message = ref('&nbsp;')
const alert =ref()

onMounted(() => {
    alert.value = document.querySelector(".alert")
})

const jumpLogin = () => {
    router.push('/register')
}
const login = () => {
    if( username.value != "" && password.value != ""){

        let data = {
            username: username.value,
            password: password.value,
        }
        doLogin(data)
            .then(async res => {
                if(res.data.code === 201){
                    await cookieStore.set({name: 'username', value: res.data.data.username})
                    await cookieStore.set({name: 'password', value: res.data.data.password})
                    router.push('/')
                }else if(res.data.code === 404){
                    if(message.value == "账号不存在"){
                        alert.value.classList.add("flashing")
                        setTimeout(() => {
                            alert.value.classList.remove("flashing")
                        }, 500);
                    }else{
                        message.value="账号不存在"
                    }
                }else{
                    console.log(res.data.message);
                }
            })
    }else{
        if(message.value == "请输入账号密码"){
            alert.value.classList.add("flashing")
            setTimeout(() => {
                alert.value.classList.remove("flashing")
            }, 500);
        }else{
            message.value="请输入账号密码"
        }
    }

}

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.login {
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    /* height: 300px; */
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 50px;
}

.title {
    font-size: 35px;
    font-weight: 200;
    user-select: none;
    text-align: center;
    width: 100%;
}

.inputs {
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

.inputBox {
    position: relative;
    width: 250px;
}

.inputBox input {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    /* background-color: #1d2b3a; */
    border-radius: 5px;
    outline: none;
    color: #000;
    font-size: 1em;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.25);
    text-transform: uppercase;
    transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
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
.inputBox input:focus {
    border: 1px solid #1300df;
}
.alert{
    margin-top: 5px;
}
.alert.flashing{
    text-shadow: red 0 0 0.1em;
    transition: 0.2s;
}
.btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    margin-top: 5px;
    flex-wrap: wrap;
}

.btn {
    width: 250px;
    padding: 10px;
    border: 1px solid #1300df;
    color: #000;
    background-color: #1300df00;
    border-radius: 5px;
    transition: 0.5s;
}

.btn:hover {
    opacity: 1;
    background-color: #1300df;
    color: #fff;
}
</style>