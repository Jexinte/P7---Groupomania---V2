<template>
  <header class="header-profile">
        <nav>
         
          <ul class="right">
            <li><router-link to="/accueil"><font-awesome-icon icon="fa-solid fa-house" /></router-link></li>
            <li><router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link></li>
          </ul>
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
justify-content: flex-end;
}

nav a {
padding-right:2em;
padding-top: 2em;
font-weight: var(--700);
color:black
}
ul li {
  list-style-type: none;
}
.right {
  padding-top: 1.9em;
  display: flex;
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