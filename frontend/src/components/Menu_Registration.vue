<template>
  <header>
        <nav>
          <ul class="left">
            <li><a href="/"><img class="banner-img-registration" src="@/assets/images/logo.png" alt="Logo Groupomania" ></a></li>
          </ul>
        
          <ul class="right">
          
            <li><router-link to="/connexion">Connexion</router-link></li>
            
          </ul>
        </nav>
      </header>
</template>


<style scoped>
header{
  margin-top: 3em;
}
/* MENU */
nav {
display: flex;

justify-content: space-between;
}

nav a {
padding-right:1em;
padding-top: 2em;
font-weight: var(--700);
color:black
}

.banner-img-registration{
  height: 136px;
  position: relative;
  bottom:54px;
}

@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}
}
</style>