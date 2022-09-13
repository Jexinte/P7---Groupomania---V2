<template>

  <div class="container">

        <div class="connexion">

          <header>
            <nav>
              <router-link to="/" >Inscription</router-link>
              <router-link to="/contact">Contact</router-link>
            </nav>
          </header>

          <!-- BANNER -->

          <div class="banner">
            <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

          </div>
        
          <!-- FORMULAIRE -->

          <form action="/connexion" method="post" enctype="multipart/form-data" class="inscription-form" @submit.prevent="verificationDesChampsDeFormulaire">
          
            <label for="mail"> 
              Adresse électronique  <br>
              <input type="email" id="mail" name="mail" v-model="adresseElectronique" placeholder="adalovelace@groupomania.fr">
            </label>
            <p id="mailerrormsg" class="erreurmsg"></p>

            <label for="motdepasse">
              Mot de passe   <br>
              <input type="password" id="motdepasse" name="motdepasse" v-model="motDePasse" >
              
            </label>
            <p @click="permettreALutilisateurDeVoirLeMotDePasseTaper">
            
              <img id="voirmotdepasse" src="@/assets/images/oeil_mot_de_passe.png" alt="" height="50">
            </p>
        
          <p id="motdepasseerrormsg" class="erreurmsg"></p>


            <input type="submit" value="Connexion" id="submit">
            <Erreur id="erreur"></Erreur>
          </form>
        </div>
  </div>

</template>


<script>
 

  import Erreur from '@/components/Erreur.vue'


  
  export default {

    data() {
        return {
            adresseElectronique: "",
            motDePasse: "",
        }
    },

    mounted: function () {

    },
    
    methods: {
        verificationDesChampsDeFormulaire(e) {
           
            const ERREURSURLEMAIL = document.getElementById("mailerrormsg");
            const ERREURSURLEMOTDEPASSE = document.getElementById("motdepasseerrormsg");
  

            if (this.adresseElectronique === "") {
                ERREURSURLEMAIL.textContent = "Le champ ne peut être vide";
                ERREURSURLEMAIL.style.color = "red";
            }

            else {
                ERREURSURLEMAIL.textContent = "";
            }

            
            if (this.motDePasse === "") {
                ERREURSURLEMOTDEPASSE.textContent = "Le champ ne peut être vide";
                ERREURSURLEMOTDEPASSE.style.color = "red";
            }
            else {
                ERREURSURLEMOTDEPASSE.textContent = "";
            }

        },

        permettreALutilisateurDeVoirLeMotDePasseTaper(){

          const CHAMPMOTDEPASSE = document.getElementById('motdepasse')

          if(CHAMPMOTDEPASSE.type === "password")
              CHAMPMOTDEPASSE.type = "text"
          else
              CHAMPMOTDEPASSE.type="password"
        }
    },
    components: { Erreur }
}

</script>
<style scoped>
  
.connexion {
  width: 80%;
  margin:0 auto 5em;

}

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


  /* BANNIERE */

  .banner  {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;
    border-bottom: 5px solid red;
  }

  .banner img {
   
    height: 342px;
    width: 347px;
    /* border: 1px solid black; */
  }
  .inscription-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em
  }

  .inscription-form label {
    line-height: 2.1em;
  
  }

  .inscription-form input {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none
  }

  #submit {
    background: white;
    font-weight: var(--900);
    cursor: pointer;
  }

  .erreurmsg{
    font-weight: var(--700);
  }

  @media screen and (max-width:340px){
    .banner img {
   
   height: 342px;
   width: 100%;

 }

 nav a {
  position: relative;
  left:9px;
 }
  }
</style>