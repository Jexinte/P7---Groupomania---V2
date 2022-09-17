import { createRouter, createWebHistory } from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Contact from '../views/Contact.vue'
import Accueil from '../views/Accueil.vue'
import CréationPost from '../views/CréationPost.vue'
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
  },

  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },

  {
    path: '/accueil',
    name: 'accueil',
    component: Accueil
  },

  {
    path: '/creationpost',
    name: 'création de post',
    component: CréationPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
