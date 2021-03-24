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

// import KeycloakConfig from "../keycloak.json";
// import VueKeycloakJs from "@dsb-norge/vue-keycloak-js";

import Keycloak from 'keycloak-js';

const myApp = createApp(App)

let initOptions = {
  url: 'https://login.sorintdev.it/auth', realm: 'sorinttest', clientId: 'stroodle', clientSecret: "faca2843-977c-43e9-9a25-12c5c252fe00"
}

const keycloak = Keycloak(initOptions)

keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: false
}).then(async (auth) => {
  if (!auth) {
    window.location.reload()
  } else {
   
    myApp.provide(process.env.VUE_APP_KEYCLOAK_PROVIDE_VARIABLE, keycloak)
    

      // await store.dispatch('keycloakStore/fillRoles', keycloak.realmAccess.roles)

    
    myApp.use(ElementPlus)
    myApp.use(VueAxios, axios)
    myApp.use(store)
    myApp.use(router)
    myApp.mount("#app");
  }
}).catch((e) => {
  console.log('Serwer lezy: ' + e)
})
  
  //createApp(App).use(store).use(router).mount('#app')

// createApp(App)
// .use(ElementPlus)
// .use(VueAxios, axios)
// .use(store)
// .use(router)
// .mount("#app");
