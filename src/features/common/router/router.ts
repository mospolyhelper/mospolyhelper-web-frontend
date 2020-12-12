import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/features/home/views/Home.vue";
import Schedule from "@/features/schedule/views/Schedule.vue";
import Deadlines from "@/features/deadlines/views/Deadlines.vue";
import Search from "@/features/search/views/Search.vue"
import Auth from "@/features/account/auth/views/auth.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/schedule",
        component: Schedule
    },
    {
        path: "/deadlines",
        component: Deadlines
    },
    {
        path: "/search",
        component: Search
    },
    {
        path: "/account/auth",
        component: Auth
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/features/common/views/NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
