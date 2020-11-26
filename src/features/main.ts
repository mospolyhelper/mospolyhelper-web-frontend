import { createApp } from 'vue';
import App from './App.vue';
import router from "@/features/common/router/router";

createApp(App).use(router).mount('#app')