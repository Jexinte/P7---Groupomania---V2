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
              <input type="email" id="mail" class="datasend" name="mail" v-model="mail" placeholder="adalovelace@groupomania.fr" required>
              <span id="mailerrormsg" class="errormsg"></span>
            </label>

            <label for="password">
              Mot de passe   <br>
              <input type="password" class="datasend" id="password" name="password" v-model="password" required>
              <span id="passworderrormsg" class="errormsg"></span>
            </label>
            <label for="checkpassword" class="checkpassword">
                Afficher le mot de passe 
                <input type="checkbox"  id="checkpassword" @click="allowUserToSeeWrittenPassword">
                
              </label>
        


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

        allowUserToSeeWrittenPassword(){

          const passwordField = document.getElementById('password')

          if(passwordField.type === "password")
              passwordField.type = "text"
          else
              passwordField.type = "password"
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

  .login-form .datasend {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none;
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
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none;
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

</style>