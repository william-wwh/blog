import request from '@/request'
import axios from 'axios'

// 登录 
export function doLogin(data){
    // console.log(data);
    // axios.defaults.withCredentials = true;
    return request({
        method: "POST",
        url: "user/",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}

// 注册
export function doRegister(data){
    return request({
        method: "POST",
        url: "user/register/",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
    })
}