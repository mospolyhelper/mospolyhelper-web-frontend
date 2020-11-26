import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/features/home/views/Home.vue";
import Schedule from "@/features/schedule/views/Schedule.vue"
import Deadlines from "@/features/deadlines/views/Deadlines.vue"

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
        path: "/Deadlines",
        component: Deadlines
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
