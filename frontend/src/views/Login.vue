<template>
<main>

  <div class="container-login">
    
    <div class="login">
      
      <Menu_Login></Menu_Login>
      
      <!-- BANNER -->
      
          <h1 class="h1-login">Connexion</h1>
          
          <!-- FORMULAIRE -->
          
          <form action="/connexion" method="post" enctype="multipart/form-data" class="login-form" @submit.prevent="checkEmptyData">
            <span class="obligationasterique">Tous les champs * sont obligatoires</span>
            <label for="mail"> 
              Adresse électronique *  <br>
              <input type="email" id="mail" class="datasend" name="mail" v-model="mail" placeholder="adalovelace@groupomania.fr" @change="disabledLoginButton" required>
              <span id="mailerrormsg" class="errormsg"></span>
            </label>
            
            <label for="password">
              Mot de passe *<br>
              <input type="password" class="datasend" id="password" name="password" v-model="password" @change="disabledLoginButton" required>
              <span id="passworderrormsg" class="errormsg"></span>
            </label>
            <label for="checkpassword" class="checkpassword">
              Afficher le mot de passe 
              <input type="checkbox"  id="checkpassword" @click="allowUserToSeeWrittenPassword">
              
            </label>
            
            
            
            <input type="submit" value="Connexion" :disabled="activeLoginButtonSubmit" id="submit" @click="login">
            <Error id="error"></Error>
          </form>
        </div>
      </div>
      
    </main>
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
            activeLoginButtonSubmit:true
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

        allowUserToSeeWrittenPassword(){

          const passwordField = document.getElementById('password')

          if(passwordField.type === "password")
              passwordField.type = "text"
          else
              passwordField.type = "password"
        },

        login(){
          user.login()
        },

        disabledLoginButton(){
          if(this.mail != "" && this.password != "")
              this.activeLoginButtonSubmit = false
          else{
            this.activeLoginButtonSubmit = true
          }
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

.h1-login {
  font-size: 2.3em;
    border-bottom: 5px solid red;
    padding-bottom: 1em;
    font-weight: var(--900);
    text-align: center;
}

.container-login{
  padding-bottom: 0;
  min-height: 100vh;
}


  /* BANNIERE */

  .banner  {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;
    border-bottom: 5px solid red;
  }


  .login-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em;
    position: relative;
    
  }

  #login-img{
    height: 400px;
  }

  .login-form label {
    line-height: 2.1em;
    font-weight: var(--900);
    transition: all ease-in 700ms;
  }

  .obligationasterique{
position: absolute;
right: 0;
top: 10px;
font-weight: 600;
font-size: 0.7em;
margin-bottom: 2em;
transition: all ease-in 700ms;
  }
  .login-form .datasend {
    width: 100%;
    padding: 13px;
  }

  .checkpassword {
    display: flex;
    gap:.5em;
  }

  .datasend{
    margin-bottom: .7em;
  }


  #submit {
    background: white;
    font-weight: var(--900);
    cursor: pointer;
    width: 100%;
    padding: 13px;
    border:1px solid black;
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



  @media screen and (max-width:305px){
    .obligationasterique{
      font-size: .6em;
      transition: all ease-in-out 700ms;
    }

  }

  @media screen and (max-width:350px){

    .login-form label {
        font-size: .8em;
        transition: all ease-in-out 700ms;
      }
  }

 

</style>