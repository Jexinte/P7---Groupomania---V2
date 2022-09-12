import { createRouter, createWebHistory } from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
const routes = [
  {
    path: '/',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Connexion
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
