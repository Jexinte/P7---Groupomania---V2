<template>
  <header>
        <nav>
          <router-link to="/accueil" ><font-awesome-icon icon="fa-solid fa-arrow-left" /></router-link>
          <router-link to="/" @click="deconnexion">Déconnexion</router-link>
        </nav>
      </header>
</template>

<script>
  import Deconnexion from '@/services/Déconnexion';
  const UTILISATEUR = new Deconnexion()
  export default {
    methods : {
      deconnexion() {
        UTILISATEUR.deconnexion_utilisateur()
      }
    }
  }
</script>
<style scoped>
/* MENU */
nav {
display: flex;
justify-content: space-between;
}

nav a {
padding-right:2em;
padding-top: 2em;
font-weight: var(--700);
color:black
}

@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}
}
</style>