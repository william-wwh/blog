<template>
    <el-header class="me-area">
        <el-row class="me-header">
            <el-col :span="3" class="me-header-left">
                <router-link to="/" class="me-title">
                    <h2 style="color: black;">blog</h2>
                </router-link>
            </el-col>
            <el-col v-if="!simple" :span="15">
                <el-menu 
                    :router=true 
                    menu-trigger="click" 
                    active-text-color="#00aaff" 
                    :default-active="activeIndex" 
                    mode="horizontal">
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/writer" v-if="user.login">
                        <el-icon><Edit /></el-icon>写文章
                    </el-menu-item>
                </el-menu>
            </el-col>
    
            <template v-else>
                <slot></slot>
            </template>
            <el-col :span="5">
                <el-menu :router=true 
                    menu-trigger="click" 
                    active-text-color="#00aaff" 
                    :default-active="activeIndex"
                    mode="horizontal">
                    <template v-if="!user.login">
                        <el-menu-item index="/login">登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </template>
                    <template v-else>
                        <el-menu-item index="/about" >{{ user.username }}</el-menu-item>
                        <el-menu-item index @click="logout"><el-icon><Back /></el-icon>退出</el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </el-header>
    </template>
    
    <script setup>
        import { ref, watch, onMounted} from 'vue'
        import { Edit,Back } from '@element-plus/icons-vue'
        import { useRouter,useRoute } from 'vue-router'

        // 使用 useRoute 获取当前路由
        const router = useRouter()
        const route  = useRoute()
        const activeIndex = ref(router.path)
        defineProps({
            activeIndex: String,
            simple: {
                type: Boolean,
                default: false
            }
        })
        const logout = async () => {
            user.value.login = false;
            await cookieStore.delete('username')
            await cookieStore.delete('password')
            user.value.username = ""
            router.push("/")
        }
        const user = ref({
            login: false,
            username: ""
        })
        onMounted(async ()=>{
            let username = await cookieStore.get('username')
            if(username == null){
                user.value.login = false
            }else{
                user.value.login = true
                user.value.username = username.value
            }
        })
        // 监听路由变化，更新activeIndex
        watch(route, (newRoute) => { 
            activeIndex.value = newRoute.path
        })
        // 设置是否登录
        cookieStore.addEventListener('change', e => {
            if(e.changed.length!=0 && e.changed[0].name == "username"){
                user.value.login = true
                user.value.username = e.changed[0].value
            }
            if(e.deleted.length!=0 && e.deleted[0].name == "username"){
                user.value.login = false
                user.value.username = ""
            }
        })
    </script>
    
<style scoped>
    
    .el-button{
        color: #0af;
    }
    .el-header{
        position: fixed;
        z-index: 1024;
        min-width: 100%;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0, 0%, 7%, .1);
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid var(--el-menu-border-color);
    }
    .me-title{
        margin-top: 10px;
        font-size: 24px;
        height: 100%;
        text-decoration: none;
    }
    .me-header{
        flex-wrap: nowrap;
    }
    .me-header-left{
        flex: 1;
        min-width: 148px;
    }
    .me-title img{
        height: 59px;
    }
    .me-header-picture{
        width: 36px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 50%;
        vertical-align: middle;
        background-color: #0af;
    }
    .el-menu-item .active{
        border: #0af solid 2px;
    }
</style>