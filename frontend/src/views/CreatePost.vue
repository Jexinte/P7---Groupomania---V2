<template>
  <div class="container">
  <!-- POSTS -->
  <div class="posts">
  
  <!-- MENU -->
  
  <Menu_CreatePost></Menu_CreatePost>
    <!-- BANNER -->
  
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
  
    </div>
  
    <!-- FORMULAIRE -->
    <div class="post">
  
      <form action="/posts" method="post" enctype="multipart/form-data" class="registration-form" @submit.prevent="checkEmptyData">
        <label for="title">
          Titre <br>
          <input type="text" id="title" name="title" v-model="title" placeholder="La patience est dure mais sa récompense est pure !" required>
        </label>
        <span id="titleerrormsg" class="errormsg"></span>
        
        <label for="image"> 
          Image  <br>
          <input type="file" id="imageFile" name="imagePost" @change="stateOfFile" required>
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
  
    #content:invalid{
      border: 3px solid rgba(255, 99, 71, 0.8);
    }
    #content:valid {
    border: 3px solid lightgreen;
  }
    #title:invalid{
      border: 3px solid rgba(255, 99, 71, 0.8);
    }
  #title:valid {
    border: 3px solid lightgreen;
  }
  
  #imageFile:invalid{
    border: 3px solid rgba(255, 99, 71, 0.8);
  }
  
  #imageFile:valid {
    border: 3px solid lightgreen;
  }
  
    .registration-form input {
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
     
     /* height: 342px; */
     width: 100%;
  
   }
  
    }
  </style>