import { createApp } from "vue";
import router from "@/features/router/router";
import App from "./App.vue";

// @ts-ignore
createApp(App)
    .use(router)
    .mount("#app");
