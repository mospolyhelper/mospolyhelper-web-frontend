import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Home
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
