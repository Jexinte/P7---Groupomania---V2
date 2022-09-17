<template>
<div class="container">
<!-- POSTS -->
<div class="posts">

<!-- MENU -->

<Menu_CreationPost></Menu_CreationPost>
  <!-- BANNER -->

  <div class="banner">
    <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >

  </div>

  <!-- FORMULAIRE -->
  <div class="post">

    <form action="/posts" method="post" enctype="multipart/form-data" class="inscription-form" @submit.prevent="verificationDesChampsDeFormulaire">
      <label for="titre">
        Titre <br>
        <input type="text" id="titre" name="titre" v-model="titre" placeholder="La patience est dure mais sa récompense est pure !">
      </label>
      <p id="titreerror" class="erreurmsg"></p>
      
      <label for="image"> 
        Image  <br>
        <input type="file" id="imageFile" name="imagePost" @change="etatDuFichier">
        <img id="output1" :src="previewUrl" v-if="previewUrl" width="100" height="100">
        <p v-else>Aucune image de téléchargée...</p>
  
      </label>
      
      
      <textarea name="contenu" id="contenu" v-model="contenu" cols="30" rows="10"></textarea>
      
      <input type="submit" value="Envoyer" id="submit">
      <Erreur id="erreur"></Erreur>
    </form>
<!-- DES CHOSES SERONT A CHANGER CE JEUDI -->
    <div class="aperçu_post">
      <h2 class="test_titre">Aperçu</h2>
      <h3 class="titre_aperçu">{{titre}}</h3>
      <img id="output2" :src="previewUrl" >
      <p class="contenu_aperçu">{{contenu}}</p>
    </div>
  </div>
</div>
<!-- FIN  POSTS -->
</div>
</template>
<script>
import Menu_CreationPost from "../components/Menu_CreationPost.vue"
import Post from "@/services/CréationPost"
const POST = new Post()

  export default {
    mounted:function(){
      POST.creationDePost()
    },
    data(){
      return {
        previewUrl:'',
        titre:'',
        contenu:''
      }
    },
    methods : {
      etatDuFichier(e){
        
      const file = e.target.files[0]
      if (!file) {
        // return false
        alert('Test')
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
      verificationDesChampsDeFormulaire(){
        if(this.titre === "" || this.contenu === ""){
          
        }
      }
   
    },
    components: {Menu_CreationPost }
}
</script>
<style scoped>
  
  .posts {
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

  #imageFile{
    margin-bottom: 1.5em;
  }


  /* APERÇU POST  */

  .aperçu_post{
    padding-top: 4em;
    text-align: center;
  }

  .test_titre {
    font-size: 2em;
border-top: 5px solid red;
padding-top: 1em;
  }
  .titre_aperçu {
    padding-top: 3em;
padding-bottom: 3em;
font-size: 3em;
text-decoration: underline;
  }

  .contenu_aperçu{
    white-space: break-spaces;
font-size: 1.4em;
font-weight: 800;
  }


  #output2{
    width: 100%;
    padding-bottom: 3em;
  }
  @media screen and (max-width:340px){
    .banner img {
   
   height: 342px;
   width: 100%;

 }

  }
</style>