import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue';

const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '*',
            component: () => import(/* webpackChuckName: notFound */ '@/features/views/NotFound.vue')
        }
    ]
})

export default router;