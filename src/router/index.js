import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      children: [
        {
          path: '',  
          component: () => import('../views/Article.vue')
        },
      ],
      props: true
    }
  ]
})

export default router
