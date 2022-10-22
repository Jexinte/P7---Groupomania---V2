<template>
  <header>
        <nav>
        
          <div class="right">
            
            <a id="profil"><font-awesome-icon icon="fa-solid fa-user" /></a>
            <router-link to="/creationpost"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link>
            <router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" v-show="access" /></router-link>
          </div>
        </nav>
      </header>

      <div class="accessfailedhomepage">
        <h2 class="h2-failedhomepage">403</h2> <br>
        <p class="p-failedhomepage">Vous n'êtes pas autorisé à accéder à ce contenu sans être connecté ! </p> <br>
        <a class="link-failedhomepage" href="/connexion"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></a>

      </div>
</template>

<script>
 import Logout from '@/services/Auth.vue';
  const user = new Logout()
  export default {
    mounted:function(){
      user.profileUserId(),
      this.shadowFooter()
    },

    data(){
      return {
        access:false
      }
    },
    methods : {
      logout() {
        user.logout()
      },

       shadowFooter() {
        const footer = document.querySelector('footer')
        footer.style.display = "none"
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

.accessfailedhomepage{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:1.5em;
    min-height: 100vh;
    justify-content: center;
}

.p-failedhomepage{
  line-height: 1.8em;
  font-weight: var(--900);
  text-align: center;
}

.h2-failedhomepage{
  color:orange;
  font-size: 18em;
  font-weight: var(--900);
  transition:  font-size 700ms ease-in;
}

footer{
  display: none;
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

.h2-failedhomepage{
  color:orange;
  font-size: 8em;
  font-weight: var(--900);
  transition:  font-size 700ms ease-in-out;
}



}


</style>