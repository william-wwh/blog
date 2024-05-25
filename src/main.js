import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios';
//Vue.prototype.$axios = Axios; //无法使用

axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.directive('loading',ElLoading.directive)
app.mount('#app')
