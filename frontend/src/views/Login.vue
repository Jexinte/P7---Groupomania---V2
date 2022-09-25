<template>

  <div class="container">

        <div class="connexion">

     <Menu_Connexion></Menu_Connexion>

          <!-- BANNER -->

          <div class="banner">
            <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

          </div>
        
          <!-- FORMULAIRE -->

          <form action="/connexion" method="post" enctype="multipart/form-data" class="connexion-form" @submit.prevent="verificationDesChampsDeFormulaire">
          
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
        


            <input type="submit" value="Connexion" id="submit" @click="connexion">
            <Erreur id="erreur"></Erreur>
          </form>
        </div>
  </div>

</template>


<script>
 

  import Erreur from '@/components/Error.vue'
  import Connexion from '@/services/Login.vue';
import Menu_Connexion from '@/components/Menu_Login.vue';
  const utilisateur = new Connexion()
  
  export default {

    data() {
        return {
            adresseElectronique: "",
            motDePasse: "",
        }
    },

  
    
    methods: {
        verificationDesChampsDeFormulaire() {
           
            const erreurSurLeMail = document.getElementById("mailerrormsg");
            const erreurSurLeMotDePasse = document.getElementById("motdepasseerrormsg");
  

            if (this.adresseElectronique === "") {
              erreurSurLeMail.textContent = "Le champ ne peut être vide";
              erreurSurLeMail.style.color = "red";
   
            }

            else {
                erreurSurLeMail.textContent = "";
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
        },

        connexion(){
          utilisateur.connexion()
        }
    },
    components: { Erreur, Menu_Connexion }
}

</script>
<style scoped>
  
.connexion {
  width: 80%;
  margin:0 auto 5em;

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
   
  }
  .connexion-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em;
    
  }

  .connexion-form label {
    line-height: 2.1em;
    font-weight: var(--900);
  }

  .connexion-form input {
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

  .verification-motdepasse{
    display: flex;
    flex-direction: column;
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