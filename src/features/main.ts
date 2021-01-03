import { createApp } from 'vue';
import App from './App.vue';
import router from "@/features/common/router/router";
import mitt from 'mitt';

const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter
app.use(router);
app.mount('#app');