<template>
<el-header class="me-area">
    <el-row class="me-header">
        <el-col :span="4" class="me-header-left">
            <router-link to="/" class="me-title">
                <img src="../../assets/images/logo.png" alt="">
            </router-link>
        </el-col>
        <el-col v-if="!simple" :span="16">
            <el-menu 
                :router=true 
                menu-trigger="click" 
                active-text-color="#00aaff" 
                :default-active="activeIndex" 
                mode="horizontal">
                <el-menu-item index="">首页</el-menu-item>
                <el-menu-item index="class">文章分类</el-menu-item>
                <el-menu-item index="writer">
                    <el-icon><Edit /></el-icon>写文章
                </el-menu-item>
            </el-menu>
        </el-col>

        <template v-else>
            <slot></slot>
        </template>
        <el-menu :router=true 
                menu-trigger="click" 
                active-text-color="#00aaff" 
                :default-active="activeIndex" 
                mode="horizontal">
            <el-col :span="4">
            
                <template v-if="!user.login">
                    <el-menu-item index="/login">登录</el-menu-item>
                    <el-menu-item index="/register">注册</el-menu-item>
                </template>
                <template v-else>
                    <el-submenu index>
                        <template slot="title">
                            {{ user.username }}
                        </template>
                        <el-menu-item index @click="logout"><el-icon><Back /></el-icon>退出</el-menu-item>
                    </el-submenu>
                </template>
            </el-col>
        </el-menu>
    </el-row>
</el-header>
</template>

<script setup>
    import { ref } from 'vue'
    import { Edit } from '@element-plus/icons-vue'
    defineProps({
        activeIndex: String,
        simple: {
            type: Boolean,
            default: false
        }
    })
    const user = ref({
        login: false,
        username: ""
    })
    const logout = () => {
        
    }
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
}
.me-title{
    margin-top: 10px;
    font-size: 24px;
}
/* .me-header-left{
    margin-top: 10px;
} */
.me-title img{
    height: 60px;
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