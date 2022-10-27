<template>
  <header>
        <nav>
          <ul class="left">
            
            <li>
      <a href="/accueil"><img class="banner-img-logout" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      </a>
            </li>


          </ul>
          <ul class="right">
            <router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link>
          </ul>
        </nav>
      </header>
</template>

<script>
import AuthService from '@/services/Auth.vue';
  const authService = new AuthService()
  export default {
    methods : {
      logout() {
        authService.logout()
      }
    }
  }
</script>
<style scoped>
/* MENU */

header{
  margin-top: 3em;
}
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

.banner-img-logout{
  height: 120px;
position: relative;
bottom: 43px;
}
@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}
}
</style>