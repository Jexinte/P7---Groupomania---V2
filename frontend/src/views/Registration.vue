<template>
<main>


  <div class="container-registration">

        <div class="registration">

        <!-- MENU -->
        <Menu_Registration></Menu_Registration>

        

          
            <h1 id="h1">Inscription</h1>
          
        
          <!-- FORMULAIRE -->

          <form action="/inscription" method="post" enctype="multipart/form-data" class="registration-form" @submit.prevent="checkEmptyData">
            <span class="obligationasterique">Tous les champs * sont obligatoires</span>

            <label for="user">
              Utilisateur <span id="asterique">*</span><br>
              <input type="text" id="user" class="datasend" name="user" v-model="user" placeholder="Ada" @change="disabledSubmitButtonRegistration" >
              <span id="usererrormsg" class="errormsg"></span>
            </label>

            <label for="quote">
            Citation personnelle <span id="asterique">*</span>  <br>
              <input type="text" id="quote" class="datasend" name="quote" v-model="quote" placeholder="Celui qui ne progresse pas chaque jour recule chaque jour" @change="disabledSubmitButtonRegistration" >
              <span id="quoteerrormsg" class="errormsg"></span>
            </label>

            <label for="image" class="imageInput"> 
          Image de profil *   <br>
          <input type="file" id="imageFile" name="imageFile" @change="stateOfFile" required >
          <img id="output1" :src="previewUrl" v-if="previewUrl" width="100" height="100">
          <span v-else>Aucune image de téléchargée...</span>
    
        </label>

        <label for="descriptionimage">
          Courte description de l'image  <span id="asterique">*</span> <br>
          <input type="text" name="descriptionimage" id="descriptionimage" v-model="descriptionImage" class="datasend" placeholder="Un paysage de montagne !" @change="disabledSubmitButtonRegistration" required>
          <span id="descriptionerrormsg" class="errormsg"></span>
        </label>

            <label for="mail"> 
              Adresse électronique <span id="asterique">*</span>  <br>
              <input type="email" id="mail" class="datasend" name="mail"  v-model="mail" placeholder="adalovelace@groupomania.fr" @change="disabledSubmitButtonRegistration">
              <span id="mailerrormsg" class="errormsg"></span>
            </label>

            <label for="password">
              Mot de passe  <span id="asterique">*</span>  <br>
              <input type="password" id="password" class="datasend" name="password" v-model="password" @change="disabledSubmitButtonRegistration">
              <span id="passworderrormsg" class="errormsg"></span>
            </label>
            
         
              <label for="checkpassword" class="checkpassword">
                Afficher le mot de passe 
                <input type="checkbox" id="checkpassword" @click="allowUserToSeeWrittenPassword">
                
              </label>
            
            <input type="submit" value="Envoyer" id="submit" :disabled="disabledRegistrationSubmitButton">
            <Error id="error"></Error>
          </form>

        </div>
  </div>
</main>
</template>


<script>
 
  import AuthService from '@/services/Auth.vue'
  import Error from '@/components/Error.vue'
  import Menu_Registration from '@/components/Menu_Registration.vue'

  const authService = new AuthService()
  
  export default {

    data() {
        return {
            user: "",
            mail: "",
            password: "",
            quote:"",
            previewUrl:'',
            descriptionImage:'',
            disabledRegistrationSubmitButton:true
            
        }
    },

    mounted: function () {
        authService.registration()
    },

    methods: {
        checkEmptyData() {
            const errorOnUser = document.getElementById("usererrormsg");
            const errorOnMail = document.getElementById("mailerrormsg");
            const errorOnPassword = document.getElementById("passworderrormsg");
            const errorOnquote = document.getElementById('quoteerrormsg')
            const errorOnDescription = document.getElementById('descriptionerrormsg')
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


            if (this.quote === "") {
                errorOnquote.textContent = "Le champ ne peut être vide";
                errorOnquote.style.color = "red";
            }
            else {
                errorOnquote.textContent = "";
            }


            if(this.descriptionImage === ""){
          errorOnDescription.textContent = "Le champ ne peut être vide";
          errorOnDescription.style.color = "red";
        }

            else {
                errorOnDescription.textContent = "";
            }

        },

        allowUserToSeeWrittenPassword(){

          const passwordField = document.getElementById('password')

          if(passwordField.type === "password")
              passwordField.type = "text"
          else
              passwordField.type = "password"
        },

        stateOfFile(e){
          
          const file = e.target.files[0]
    
          if (!file) {
            //  return false
         
          }
          if (!file.type.match('image.*')) {
            alert('Ceci n\'est pas une image !')
          }
          const reader = new FileReader()
          const that = this
          reader.onload = function (e) {
            that.previewUrl = e.target.result
          }
          reader.readAsDataURL(file)
        
          },

          disabledSubmitButtonRegistration(){
            if(this.user != "" && this.quote != "" && this.descriptionImage != "" && this.mail != "" && this.password)
            this.disabledRegistrationSubmitButton = false
      
            else{
              this.disabledRegistrationSubmitButton = true
            }
 
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

.container-registration {
  transition: width 700ms;
}


  /* BANNIERE */

  
  
  
  #h1{
    font-size: 3.5em;
    border-bottom: 5px solid red;
    padding-bottom: 1em;
    font-weight: var(--900);
    text-align: center;
    transition: font-size ease-in 700ms;
  }
  .registration-form {
    display: flex;
    flex-direction: column;
    gap:1.5em;   
    padding-top:1.5em;
    position: relative;
  }

  .registration-form label {
    line-height: 2.1em;
    font-weight: var(--900);
  
  }

  .registration-form .datasend {
    width: 100%;
    padding: 13px;
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

  #seepassword{
    cursor: pointer;
  }

  .imageInput{
    display: flex;
    flex-direction: column;
    gap: 1.1em;
  }


  @media screen and (max-width:992px){
  .container{
    width: 100%;
    transition: width 700ms;
  }
 
  #h1{
    font-size: 2.3em;
    transition: font-size ease-out 700ms;
  }
 

}
</style>