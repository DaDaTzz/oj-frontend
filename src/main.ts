import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import "@/access";
import 'bytemd/dist/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(ArcoVue).mount('#app')
