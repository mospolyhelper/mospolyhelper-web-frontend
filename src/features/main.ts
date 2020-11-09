import { createApp } from 'vue';
import App from './App.vue';
import router from "@/features/router/router";

createApp(App).use(router).mount('#app')