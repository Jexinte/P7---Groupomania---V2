<template>
  <div class="container">
    <section class="inscription">

      <header>
        <nav>
          <router-link to="/connexion" >Connexion</router-link>
        </nav>
      </header>
      
      <div class="banner">
        <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania">
        <hr>
      </div>

      <form action="/inscription" method="post" enctype="multipart/form-data">
        <label for="utilisateur">
          Utilisateur : 
          <input type="text" name="utilisateur" v-model="utilisateur">
        </label>

        <label for="mail">
          Adresse électronique : 
          <input type="email" name="mail" v-model="adresseElectronique">
        </label>
      </form>
    </section>
  </div>
</template>