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

import KeycloakConfig from "../keycloak.json";


import Keycloak from 'keycloak-js';

const myApp = createApp(App)

let initOptions = {
  url: KeycloakConfig["auth-server-url"], realm: KeycloakConfig.realm, clientId: KeycloakConfig.resource, clientSecret: KeycloakConfig.credentials.secret
}

const keycloak = Keycloak(initOptions)

myApp.config.globalProperties.$keycloak = keycloak;
myApp.use(ElementPlus)

myApp.use(VueAxios, axios)
myApp.use(store)
myApp.use(router)
myApp.mount("#app");

keycloak.init({
  onLoad: "check-sso",

  checkLoginIframe: false
}).then(async (auth) => {
  if (!auth) {

  } else if (auth) {
    console.log("I am signed in")

    //store auth and dispatch dashboard data
    store.state.currentUserName = keycloak.tokenParsed.name;
    store.state.loggedIn = true;
    store.state.currentAuthToken = keycloak.token;
    store.dispatch('getAllOrganizationDashboard');
    store.dispatch('organizationsDefaultTriggerTimeInDb');
   
  }
}).catch((e) => {
  console.log('Serwer lezy: ' + e)
})

