<template>
   <header>
            <nav>
              <router-link to="/" >Inscription</router-link>
              <router-link to="/contact">Contact</router-link>
            </nav>
          </header>
</template>

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
  @media screen and (max-width:340px){
 nav a {
  position: relative;
  left:9px;

 }
  }

</style>