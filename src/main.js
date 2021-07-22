import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import "@/assets/styles/tailwind.css";
import ElementPlus from 'element-plus';
// import 'mdb-vue-ui-kit/css/mdb.min.css'
// import 'element-plus/lib/theme-chalk/index.css';
import './assets/styles/element-variables.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'



const myApp = createApp(App)


myApp.use(ElementPlus)
myApp.use(VueAxios, axios)
myApp.use(store)
myApp.use(router)
myApp.mount("#app");

