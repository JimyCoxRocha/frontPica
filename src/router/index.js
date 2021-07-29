import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginPage.vue'
import LoggedInLayout from '../views/LoggedInLayout.vue'
import LogDebug from '../views/reporte/LogDebug.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'LoggedInLayout',
    component: LoggedInLayout,
    props: true,
    children: [
      {
        title: 'Home',
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        title: 'LogDebug',
        path: '/logDebug',
        name: 'LogDebug',
        component: LogDebug
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
