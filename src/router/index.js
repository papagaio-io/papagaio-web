import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import dashboard from "../views/Dashboard"
import neworganization from "../views/NewOrganization.vue"
import confirmation from "../views/Confirmation.vue"
import triggerscan from "../views/TriggerScan.vue";
import pagenotfound from "../views/PageNotFound.vue";
// import store from '../store/index.js'
import store from '../store/index'



const preventRoutes = {

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     // access to component instance via `vm`
  //    // console.log(vm.$keycloak.authenticated);
  //     if (vm.$keycloak.authenticated) {

  //       next();
  //     } else {

  //       next("/");
  //     }


  //   })
  // }



  beforeEnter: (to, from, next) => {
    // console.log(store.getters.getLoginState);
    // console.log(this.$keycloak.token);
    if (store.getters.getLoginState === "true") {

      next();
    } else {


      next("http://localhost:8080/");
    }

  }

}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: dashboard,
    ...preventRoutes,

  },
  {
    path: '/neworganization',
    name: 'NewOrganization',
    component: neworganization,
    ...preventRoutes

  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: confirmation,
    ...preventRoutes
  },
  {
    path: '/triggerscan',
    name: 'Triggerscan',
    component: triggerscan,
    ...preventRoutes
  },
  {
    path: "/:catchAll(.*)",
    name: '404Page',
    component: pagenotfound,

  },

]

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router