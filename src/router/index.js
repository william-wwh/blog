// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/index.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/Login.vue')
        },
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/Register.vue')
        },
      ]
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/Article.vue')
        },
      ],
      props: true
    },
    {
      path: '/writer/',
      name: 'writer',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/Writer.vue')
        },
      ],
      props: true
    },
    {
      path: '/about/',
      name: 'about',
      component: Home,
      children: [
        {
          path: '',  
          component: () => import('../views/About.vue')
        },
      ],
      props: true
    }
  ]
})
export default router
