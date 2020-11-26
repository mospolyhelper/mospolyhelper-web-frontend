import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/features/home/views/Home.vue";
import Schedule from "@/features/schedule/views/Schedule.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/Schedule",
        component: Schedule
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/features/common/views/NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
