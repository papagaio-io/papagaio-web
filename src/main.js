import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/tailwind.css";
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import './assets/styles/element-variables.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'



createApp(App)
.use(ElementPlus)
.use(VueAxios, axios)
.use(store)
.use(router)
.mount("#app");
