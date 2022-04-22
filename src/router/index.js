import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import AnimalDetail from '../views/AnimalDetail.vue'
import Perfil from '../views/Perfil.vue'
import Meus from '../views/Meus.vue'
import Anuncio from '../views/Anuncio.vue'
import Vacinas from '../views/Vacinas.vue'
import NewAnuncio from '../views/NewAnuncio.vue'

Vue.use(VueRouter)

function guardMyroute(to, from, next) { 
  var isAuthenticated= false; 
  if(localStorage.getItem('login')) {
    isAuthenticated = true
  } else {
    isAuthenticated= false
  }
  if(isAuthenticated) { 
    next()
  } 
  else { 
    next('/login') 
  } 
}

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter : guardMyroute,
    component: Home,
    meta: {title: 'Pagina INICIAL'}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/animal/:anuncio/:id',
    name: 'animal',
    beforeEnter : guardMyroute,
    component: AnimalDetail
  },
  {
    path: '/meus',
    name: 'meus',
    beforeEnter : guardMyroute,
    component: Meus
  },
  {
    path: '/anuncio/:anuncio/:id',
    name: 'anuncio',
    beforeEnter : guardMyroute,
    component: Anuncio
  },
  {
    path: '/perfil',
    name: 'perfil',
    beforeEnter : guardMyroute,
    component: Perfil
  },
  {
    path: '/vacinas',
    name: 'vacinas',
    beforeEnter : guardMyroute,
    component: Vacinas
  },
  {
    path: '/new-anuncio',
    name: 'new',
    beforeEnter : guardMyroute,
    component: NewAnuncio
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
