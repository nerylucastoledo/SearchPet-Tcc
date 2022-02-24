import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Animal from '../views/Animal.vue'
import Perfil from '../views/Perfil.vue'
import Meus from '../views/Meus.vue'
import Anuncio from '../views/Anuncio.vue'
import Vacinas from '../views/Vacinas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'loin',
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
    path: '/animal',
    name: 'animal',
    component: Animal
  },
  {
    path: '/meus',
    name: 'meus',
    component: Meus
  },
  {
    path: '/anuncio',
    name: 'anuncio',
    component: Anuncio
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil
  },
  {
    path: '/vacinas',
    name: 'vacinas',
    component: Vacinas
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
