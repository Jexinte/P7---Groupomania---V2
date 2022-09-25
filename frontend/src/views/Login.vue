<template>

  <div class="container">

        <div class="login">

     <Menu_Login></Menu_Login>

          <!-- BANNER -->

          <div class="banner">
            <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

          </div>
        
          <!-- FORMULAIRE -->

          <form action="/connexion" method="post" enctype="multipart/form-data" class="login-form" @submit.prevent="checkEmptyData">
          
            <label for="mail"> 
              Adresse électronique  <br>
              <input type="email" id="mail" name="mail" v-model="mail" placeholder="adalovelace@groupomania.fr">
            </label>
            <p id="mailerrormsg" class="errormsg"></p>

            <label for="password">
              Mot de passe   <br>
              <input type="password" id="password" name="password" v-model="password" >
              
            </label>
            <div class="verification-password">

              <p @click="permettreALutilisateurDeVoirLeMotDePasseTaper">
              
                <img id="seepassword" src="@/assets/images/oeil_mot_de_passe.png" alt="" height="50">
              </p>
              <p id="passworderrormsg" class="errormsg"></p>
            </div>
        


            <input type="submit" value="Connexion" id="submit" @click="login">
            <Error id="error"></Error>
          </form>
        </div>
  </div>

</template>


<script>
 

  import Error from '@/components/Error.vue'
  import Login from '@/services/Auth.vue';
import Menu_Login from '@/components/Menu_Login.vue';
  const user = new Login()
  
  export default {

    data() {
        return {
            mail: "",
            password: "",
        }
    },

  
    
    methods: {
        checkEmptyData() {
           
            const errorOnMail = document.getElementById("mailerrormsg");
            const errorOnPassword = document.getElementById("passworderrormsg");
  

            if (this.mail === "") {
              errorOnMail.textContent = "Le champ ne peut être vide";
              errorOnMail.style.color = "red";
   
            }

            else {
                errorOnMail.textContent = "";
            }

            
            if (this.password === "") {
              errorOnPassword.textContent = "Le champ ne peut être vide";
              errorOnPassword.style.color = "red";
            
            }
            else {
                errorOnPassword.textContent = "";
            }

        },

        permettreALutilisateurDeVoirLeMotDePasseTaper(){

          const passwordField = document.getElementById('password')

          if(passwordField.type === "password")
              passwordField.type = "text"
          else
              passwordField.type="password"
        },

        login(){
          user.login()
        }
    },
    components: { Error, Menu_Login }
}

</script>
<style scoped>
  
.login {
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
  .login-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em;
    
  }

  .login-form label {
    line-height: 2.1em;
    font-weight: var(--900);
  }

  .login-form input {
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

  .errormsg{
    font-weight: var(--700);
  }

  .verification-password{
    display: flex;
    flex-direction: column;
  }

  #seepassword{
    cursor: pointer;
  }
  @media screen and (max-width:340px){
    .banner img {
   
   height: 342px;
   width: 100%;

 }

  }
</style>