<template>

  <div class="container">

        <div class="registration">

        <!-- MENU -->
        <Menu_Registration></Menu_Registration>

          <!-- BANNER -->

          <div class="banner">
            <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

          </div>
        
          <!-- FORMULAIRE -->

          <form action="/inscription" method="post" enctype="multipart/form-data" class="registration-form" @submit.prevent="checkEmptyData">

            <label for="user">
              Utilisateur  <br>
              <input type="text" id="user" class="datasend" name="user" v-model="user" placeholder="Ada">
              <span id="usererrormsg" class="errormsg"></span>
            </label>

            <label for="mail"> 
              Adresse électronique  <br>
              <input type="email" id="mail" class="datasend" name="mail"  v-model="mail" placeholder="adalovelace@groupomania.fr">
              <span id="mailerrormsg" class="errormsg"></span>
            </label>

            <label for="password">
              Mot de passe   <br>
              <input type="password" id="password" class="datasend" name="password" v-model="password" >
              <span id="passworderrormsg" class="errormsg"></span>
            </label>
            
         
              <label for="checkpassword" class="checkpassword">
                Afficher le mot de passe 
                <input type="checkbox" id="checkpassword" @click="allowUserToSeeWrittenPassword">
                
              </label>
            <input type="submit" value="Envoyer" id="submit">
            <Error id="error"></Error>

          </form>

        </div>
  </div>

</template>


<script>
 
  import Registration from '@/services/Auth.vue'
  import Error from '@/components/Error.vue'
  import Menu_Registration from '@/components/Menu_Registration.vue'

  const user = new Registration()
  
  export default {

    data() {
        return {
            user: "",
            mail: "",
            password: "",
            
        }
    },

    mounted: function () {
        user.registration()
    },

    methods: {
        checkEmptyData() {
            const errorOnUser = document.getElementById("usererrormsg");
            const errorOnMail = document.getElementById("mailerrormsg");
            const errorOnPassword = document.getElementById("passworderrormsg");
   
          
        if(this.user === ""){
          errorOnUser.textContent = "Le champ ne peut être vide";
          errorOnUser.style.color = "red";
        }

            else {
                errorOnUser.textContent = "";
            }

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
        }
    },
    components: { Error, Menu_Registration }
}

</script>
<style scoped>
  
.registration {
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

  .registration-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em
  }

  .registration-form label {
    line-height: 2.1em;
    font-weight: var(--900);
  
  }

  .registration-form .datasend {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none
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
    border:none
  }

  .errormsg{
    font-weight: var(--700);
  }

  #seepassword{
    cursor: pointer;
  }

</style>