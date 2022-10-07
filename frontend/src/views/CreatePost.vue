<template>
  <div class="container">
  <!-- POSTS -->
  <div class="posts">
  
  <!-- MENU -->
  
  <Menu_CreatePost></Menu_CreatePost>
    <!-- BANNER -->
  
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      <h2 id="h2">Écrire un post</h2>
    </div>
  
    <!-- FORMULAIRE -->
    <div class="post">
  
      <form action="/posts" method="post" enctype="multipart/form-data" class="registration-form" @submit.prevent="checkEmptyData">
        <label for="title">
          Titre <br>
          <input type="text" id="title" name="title" v-model="title" placeholder="La patience est dure mais sa récompense est pure !"  required>
        </label>
        <span id="titleerrormsg" class="errormsg"></span>
        
        <label for="image"> 
          Image  <br>
          <input type="file" id="imageFile" name="imageFile" @change="stateOfFile" required>
          <img id="output1" :src="previewUrl" v-if="previewUrl" width="100" height="100">
          <span v-else>Aucune image de téléchargée...</span>
    
        </label>
        
        <label for="content">
          Contenu <br>
          <textarea name="content" id="content" v-model="content"  cols="30" rows="10" required></textarea >
            <span id="contenterrormsg" class="errormsg"></span>
          </label>
        
        <input type="submit" value="Envoyer" id="submit">
  
      </form>
  
      <div class="preview_post">
        <h2 class="preview_title">Aperçu</h2>
        <h3 class="preview_secondtitle">{{title}}</h3>
        <img id="output2" :src="previewUrl" >
        <p class="content_preview">{{content}}</p>
      </div>
    </div>
  </div>
  <!-- FIN  POSTS -->
  </div>
  </template>
  <script>
  import Menu_CreatePost from "../components/Menu_CreatePost.vue"
  import CreatePost from "@/services/Posts.vue"
  
  const user = new CreatePost()
  
    export default {
      mounted:function(){
        user.createPost()
        
      },
      data(){
        return {
          previewUrl:'',
          title:'',
          content:'',
          image:''
        }
      },
      methods : {
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
  
          checkEmptyData(){
            const errorTitleMsg = document.getElementById('titleerrormsg')
            const errorContentMsg = document.getElementById('contenterrormsg')
            
            if(this.title === "" ){
              errorTitleMsg.textContent = "Ce champ ne peut-être vide"
              errorTitleMsg.style.color="red"
              errorTitleMsg.style.background="red"
  
            }
  
            
            else {
              errorTitleMsg.textContent = ""
            }
  
  
            if( this.content === ""){
              errorContentMsg.textContent = "Ce champ ne peut-être vide"
              errorContentMsg.style.color="red"
  
            }
  
            else {
              errorContentMsg.textContent = ""
            }
            
          }
      
     
      },
      components: {Menu_CreatePost,Error }
  }
  </script>
  <style scoped>
    
  
  
  
  
  
    /* BANNIERE */
  
    .banner  {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.5em;
      border-bottom: 5px solid red;
    }
  #h2{
    font-size: 3em;
    text-align: center;
    font-weight: 900;
    padding-bottom: 1em;
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
  
  
  
    .registration-form input {
      width: 100%;
      padding: 13px;
    }
  
    #submit {
      background: white;
      font-weight: var(--900);
      cursor: pointer;
      border:1px solid black;
    }
  
    .errormsg{
      font-weight: var(--700);
    }
  
    #voirmotdepasse{
      cursor: pointer;
    }
  
    #imageFile{
      margin-bottom: 1.5em;
    }
  
  
    /* APERÇU POST  */
  
    .preview_post{
      padding-top: 4em;
      text-align: center;
    }
  
    .preview_title {
      font-size: 2em;
  border-top: 5px solid red;
  padding-top: 1em;
    }
    .preview_secondtitle {
      padding-top: 3em;
  padding-bottom: 3em;
  font-size: 3em;
  text-decoration: underline;
    }
  
    .content_preview{
      white-space: break-spaces;
  font-size: 1.4em;
  font-weight: 800;
    }
  
    #content{
      width: 100%;
    }
  
    #output2{
      width: 100%;
      padding-bottom: 3em;
    }
    @media screen and (max-width:340px){
      .banner img {
     width: 100%;
   }

   .preview_secondtitle{
    font-size: 2em;
   }
  
    }
  </style>