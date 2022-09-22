<template>

  <div class="container">

        <div class="inscription">

        <!-- MENU -->
        <Menu_Inscription></Menu_Inscription>

          <!-- BANNER -->

          <div class="banner">
            <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

          </div>
        
          <!-- FORMULAIRE -->

          <form action="/inscription" method="post" enctype="multipart/form-data" class="inscription-form" @submit.prevent="verificationDesChampsDeFormulaire">
            <label for="utilisateur">
              Utilisateur  <br>
              <input type="text" id="utilisateur" name="utilisateur" v-model="utilisateur" placeholder="Ada Lovelace">
            </label>
            <p id="utilisateurerrormsg" class="erreurmsg"></p>

            <label for="mail"> 
              Adresse électronique  <br>
              <input type="email" id="mail" name="mail" v-model="adresseElectronique" placeholder="adalovelace@groupomania.fr">
            </label>
            <p id="mailerrormsg" class="erreurmsg"></p>

            <label for="motdepasse">
              Mot de passe   <br>
              <input type="password" id="motdepasse" name="motdepasse" v-model="motDePasse" >
              
            </label>
            
            <div class="verification-motdepasse">

<p @click="permettreALutilisateurDeVoirLeMotDePasseTaper">

  <img id="voirmotdepasse" src="@/assets/images/oeil_mot_de_passe.png" alt="" height="50">
</p>
<p id="motdepasseerrormsg" class="erreurmsg"></p>
</div>


            <input type="submit" value="Envoyer" id="submit">
            <Erreur id="erreur"></Erreur>
          </form>
        </div>
  </div>

</template>


<script>
 
  import Utilisateur from '@/services/Inscription.js'
  import Erreur from '@/components/Erreur.vue'
import Menu_Inscription from '@/components/Menu_Inscription.vue'

  const utilisateur = new Utilisateur()
  
  export default {

    data() {
        return {
            utilisateur: "",
            adresseElectronique: "",
            motDePasse: "",
            
        }
    },

    mounted: function () {
        utilisateur.inscription();
    },

    methods: {
        verificationDesChampsDeFormulaire(e) {
            const erreurSurLutilisateur = document.getElementById("utilisateurerrormsg");
            const erreurSurLemail = document.getElementById("mailerrormsg");
            const erreurSurLeMotDePasse = document.getElementById("motdepasseerrormsg");
   
        
            if (this.utilisateur === "") {
                erreurSurLutilisateur.textContent = "Le champ ne peut être vide";
                erreurSurLutilisateur.style.color = "red";
                e.preventDefault();
            }
            else {
                erreurSurLutilisateur.textContent = "";
            }

            if (this.adresseElectronique === "") {
                erreurSurLemail.textContent = "Le champ ne peut être vide";
                erreurSurLemail.style.color = "red";
            }

            else {
                erreurSurLemail.textContent = "";
            }

            
            if (this.motDePasse === "") {
                erreurSurLeMotDePasse.textContent = "Le champ ne peut être vide";
                erreurSurLeMotDePasse.style.color = "red";
            }
            else {
                erreurSurLeMotDePasse.textContent = "";
            }

        },

        permettreALutilisateurDeVoirLeMotDePasseTaper(){

          const champMotDePasse = document.getElementById('motdepasse')

          if(champMotDePasse.type === "password")
              champMotDePasse.type = "text"
          else
              champMotDePasse.type="password"
        }
    },
    components: { Erreur, Menu_Inscription }
}

</script>
<style scoped>
  
.inscription {
  width: 80%;
  margin:0 auto 5em;
  font-family: var(--lato);
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
    font-weight: var(--900);
  
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

  #voirmotdepasse{
    cursor: pointer;
  }

  @media screen and (max-width:340px){
    .banner img {
   
   height: 342px;
   width: 100%;

 }

  }
</style>