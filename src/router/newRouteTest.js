import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import pagenotfound from "../views/PageNotFound.vue";
// import store from '../store/index.js'

const createRoutes = (myApp) => {
    const preventRoutes =  {

        beforeEnter(to, from, next){
            const authenticated = myApp.config.globalProperties.$keycloak?.authenticated.value;
            console.log({ to, from, next, authenticated });
            if(authenticated) {
                next();
            }else{
                next('/')
            }
        }

  

    }

    return [ 
    {

        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        ...preventRoutes,
    
      },
      {
        path: '/neworganization',
        name: 'NewOrganization',
        component: () => import('../views/NewOrganization.vue'),
        ...preventRoutes,
    
      },
      {
        path: '/confirmation',
        name: 'Confirmation',
        component: () => import('../views/Confirmation.vue'),
        ...preventRoutes,
      },
      {
        path: '/triggerscan',
        name: 'Triggerscan',
        component: () => import('../views/TriggerScan.vue'),
        ...preventRoutes,
      },
      {
        path: "/:catchAll(.*)",
        name: '404Page',
        component: pagenotfound,
    
      },

];
};
export const createRouter = (myApp) =>
  createVueRouter({
    mode: "history",
    history: createWebHistory(),
    routes: createRoutes(myApp)
  });



// export const router = createRouter({
  
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
