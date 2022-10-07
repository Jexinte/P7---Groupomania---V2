<template>
  <header>
        <nav>
          <router-link to="/accueil" ><font-awesome-icon icon="fa-solid fa-arrow-left" /></router-link>
          <router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link>
        </nav>
      </header>
</template>

<script>
import Logout from '@/services/Auth.vue';
  const user = new Logout()
  export default {
    methods : {
      logout() {
        user.logout()
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