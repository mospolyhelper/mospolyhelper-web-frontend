import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/features/home/views/Home.vue";
import Schedule from "@/features/schedule/views/Schedule.vue";
import Deadlines from "@/features/account/deadlines/views/Deadlines.vue";
import Search from "@/features/search/views/Search.vue";
import Auth from "@/features/account/auth/views/Auth.vue";
import AccountInfoPage from "@/features/account/info/views/AccountInfoPage.vue";
import TeachersSearch from "@/features/account/teachersSearch/views/TeachersSearch.vue";
import Classmates from "@/features/account/classmates/views/Classmates.vue";
import Marks from "@/features/account/marks/views/Marks.vue";
import Applications from "@/features/account/applications/views/Applications.vue";

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
        path: "/account/deadlines",
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
        path: "/locations",
        component: () => import("@/features/locations/views/Locations.vue")
    },
    {
        path: "/account/info",
        component: AccountInfoPage
    },
    {
        path: "/account/applications",
        component: Applications
    },
    {
        path: "/account/teachersSearch",
        component: TeachersSearch
    },
    {
        path: "/account/classmates",
        component: Classmates
    },
    {
        path: "/account/marks",
        component: Marks
    },
    {
        path: "/account/dialogs",
        component: () => import("@/features/account/dialogs/views/DialogsList.vue")
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
