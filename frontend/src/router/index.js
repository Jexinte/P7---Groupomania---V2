import { createRouter, createWebHistory } from 'vue-router'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'

import Homepage from '../views/Homepage.vue'
import CreatePost from '../views/CreatePost.vue'
import DisplayPost from '../views/DisplayPost.vue'
import DisplayComments from '../components/DisplayComments.vue'
import CreateComments from '../components/CreateComments.vue'
import ModifyPost from '../components/Modify.vue'
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
    path:'/creationCommentaire',
    name:'Espace pour créer les commentaires',
    component:CreateComments
  },

  {
    path:'/affichageCommentaire',
    name:'Espace pour afficher les commentaires',
    component: DisplayComments
  },
  {
    path:'/modifierpost',
    name:'modification de post',
    component: ModifyPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
