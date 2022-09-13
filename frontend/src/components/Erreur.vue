<template>
  <div id="erreur">

    <img src="@/assets/images/erreur_croix.jpg" alt=""> 
  <p id="erreur-msg"></p>
  </div>
</template>


<style scoped>

  #erreur {
    width: 200px;
    background: white;
    display: none;
    font-family: var(--lato);
    font-weight:var(--700);
    color: red;
    margin: 0 auto;
  }

  #erreur img {
    width: 100%;
  }


</style>