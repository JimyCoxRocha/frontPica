import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginPage.vue'
import LoggedInLayout from '../views/LoggedInLayout.vue'
import LogAuditoria from '../views/reporte/LogAuditoria.vue'
import LogError from '../views/reporte/LogError.vue'
import AgruparAplicaciones from '../views/dashboard/AgruparAplicaciones.vue'
import EliminarLog from '../views/procesos/EliminarLog.vue';
import Postman from '../views/procesos/Postman.vue';

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
        title: 'LogAuditoria',
        path: '/logAuditoria',
        name: 'LogAuditoria',
        component: LogAuditoria
      },
      {
        title: 'LogError',
        path: '/logError',
        name: 'LogError',
        component: LogError
      },
      {
        title: 'AgruparPorAplicaciones',
        path: '/agruparPorAplicaciones',
        name: 'AgruparPorAplicaciones',
        component: AgruparAplicaciones
      },
      {
        title: 'EliminarLog',
        path: '/eliminarLog',
        name: 'EliminarLog',
        component: EliminarLog
      },
      {
        title: 'Postman',
        path: '/postman',
        name: 'Postman',
        component: Postman
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
