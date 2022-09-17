<template>
  <header>
        <nav>
          <!-- <router-link to="/accueil" ><font-awesome-icon icon="fa-solid fa-arrow-left" /></router-link> -->
          <div class="right">
            <router-link to="/creationpost">Écrire un post</router-link>
            <router-link to="/" @click="deconnexion">Déconnexion</router-link>
          </div>
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
justify-content: flex-end;
}

nav a {
padding-right:2em;
padding-top: 2em;
font-weight: var(--700);
color:black
}

.right {
  padding-top: 1.9em;
}

@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}


}

@media screen and (min-width:0px) and (max-width:900px){
  .right {
  display: flex;
  justify-content: space-between;
}

.right a {
  font-size: .9em;
}

}


</style>