<template>
  <header>
        <nav>
          <a href="#user">Inscription</a>
          <router-link to="/connexion" >Connexion</router-link>
     
        </nav>
      </header>
</template>


<style scoped>
/* MENU */
nav {
display: flex;
/* justify-content: flex-end; */
justify-content: space-between;
}

nav a {
padding-right:1em;
padding-top: 2em;
font-weight: var(--700);
color:black
}
/* 
@media screen and (max-width:992px){
  .container{
    width: 100%;
  }

  nav{
    justify-content: space-between;
  }
} */
@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}
}
</style>