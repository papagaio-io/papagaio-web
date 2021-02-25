import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import projectsetup from "/home/mohab/Documents/projects/projects/papagaio-fe/src/components/projectsetup.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/projectsetup",
    component: projectsetup,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
