import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import organizationsetup from "../views/OrganizationSetup.vue";
import dashboard from "../views/Dashboard"
import neworganization from "../views/NewOrganization.vue"
import confirmation from "../views/Confirmation.vue"
import triggerscan from "../views/TriggerScan.vue";
import pagenotfound from "../views/PageNotFound.vue";
// import store from '../store/index.js'
import store from '../store/index'


const preventRoutes = {
  beforeEnter: (to, from, next) => {
    // console.log(store.getters.getLoginState);
    // console.log(this.$keycloak.authenticated);
    if (store.getters.getLoginState === "true") {

      next();
    } else {

      
      next("/");
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
    path: '/organizationsetup',
    name: 'OrganizationSetup',
    component: organizationsetup
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

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },


]

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
