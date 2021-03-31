import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import "@/assets/styles/tailwind.css";
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import './assets/styles/element-variables.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtDecode from "jwt-decode";

// import KeycloakConfig from "../keycloak.json";
// import VueKeycloakJs from "@dsb-norge/vue-keycloak-js";

import Keycloak from 'keycloak-js';

const myApp = createApp(App)
myApp.config.globalProperties.$keycloak = Keycloak;



let initOptions = {
  url: 'https://login.sorintdev.it/auth', realm: 'sorinttest', clientId: 'stroodle', clientSecret: "faca2843-977c-43e9-9a25-12c5c252fe00"
}

const keycloak = Keycloak(initOptions)


myApp.use(ElementPlus)
myApp.use(VueAxios, axios)
myApp.use(store)
myApp.use(router)
myApp.config.globalProperties.$keycloak = keycloak;
myApp.mount("#app");

keycloak.init({
  onLoad: "check-sso",

  checkLoginIframe: false
}).then(async (auth) => {
  if (!auth) {
    // window.location.reload()
  } else if (auth) {
    console.log("I am signed in")
 
    store.state.currentUserName = keycloak.tokenParsed.preferred_username;
    store.state.loggedIn = true;
    store.state.currentTokenId = keycloak.token;
    
    // await store.dispatch('keycloakStore/fillRoles', keycloak.realmAccess.roles)


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
