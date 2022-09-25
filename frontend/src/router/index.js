import { createRouter, createWebHistory } from 'vue-router'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import Homepage from '../views/Homepage.vue'
import CreatePost from '../views/CreatePost.vue'
import DisplayPost from '../views/DisplayPost.vue'
import DisplayComments from '../components/DisplayComments.vue'
import CreateComments from '../components/CreateComments.vue'
const routes = [
  {
    path: '/',
    name: 'inscription',
    component: Registration
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Login
  },

  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },

  {
    path: '/accueil',
    name: 'accueil de l\'ensemble des posts',
    component: Homepage
  },

  {
    path: '/creationpost',
    name: 'création de post',
    component: CreatePost
  },

  {
    path: '/post',
    name: 'Affiche un post',
    component: DisplayPost
  },

  {
    path:'/t',
    name:'Espace pour créer les commentaires',
    component:CreateComments
  },

  {
    path:'/t',
    name:'Espace pour afficher les commentaires',
    component: DisplayComments
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
