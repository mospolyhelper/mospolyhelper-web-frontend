import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/map",
        component: () => /* webpackChunkName: map */ import('@/features/views/MapPage.vue')
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/features/views/NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
