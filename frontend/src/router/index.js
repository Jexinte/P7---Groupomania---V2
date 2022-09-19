import { createRouter, createWebHistory } from 'vue-router'
import Inscription from '../views/Inscription.vue'
import Connexion from '../views/Connexion.vue'
import Contact from '../views/Contact.vue'
import Accueil from '../views/Accueil.vue'
import CréationPost from '../views/CréationPost.vue'
import AfficheUnPost from '../views/AfficheUnPost.vue'
import AfficheCommentaires from '../components/AfficheCommentaires.vue'
import CréationCommentaires from '../components/CréationCommentaires.vue'
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
    name: 'accueil de l\'ensemble des posts',
    component: Accueil
  },

  {
    path: '/creationpost',
    name: 'création de post',
    component: CréationPost
  },

  {
    path: '/post',
    name: 'Affiche un post',
    component: AfficheUnPost
  },

  {
    path:'/t',
    name:'Espace pour créer les commentaires',
    component:CréationCommentaires
  },

  {
    path:'/t',
    name:'Espace pour afficher les commentaires',
    component: AfficheCommentaires
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
