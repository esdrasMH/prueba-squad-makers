import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'welcome' },
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: Welcome,
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home.vue'),
        },
    ]
})

export default router
