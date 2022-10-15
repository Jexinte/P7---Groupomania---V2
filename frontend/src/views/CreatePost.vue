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
  
      <form action="/posts" method="post" enctype="multipart/form-data" class="create-form" @submit.prevent>
        <label for="title">
          Titre <br>
          <input type="text" id="title" name="title" v-model="title" placeholder="La patience est dure mais sa récompense est pure !" @change="hideSubmitButton" required>
        </label>
        <span id="titleerrormsg" class="errormsg"></span>
        
        <label for="image"> 
          Image  <br>
          <input type="file" id="imageFile" name="imageFile" @change="stateOfFile"  required>
          <img id="output1" :src="previewUrl" v-if="previewUrl" width="100" height="100">
          <span v-else>Aucune image de téléchargée...</span>
        </label>

        <label for="descriptionimage">
          Courte description de l'image : <br>
          <input type="text" name="descriptionimage" id="descriptionimage" v-model="descriptionImage" class="datasend" placeholder="Un paysage de montagne !" required @change="hideSubmitButton">
          <span id="descriptionerrormsg" class="errormsg"></span>
        </label>
        
        <label for="content">
          Contenu <br>
          <textarea name="content" id="content" v-model="content"  cols="30" rows="10" required @change="hideSubmitButton"></textarea >
            <span id="contenterrormsg" class="errormsg"></span>
          </label>
          <!-- @click="createPost" -->
        <input type="submit" value="Envoyer" id="submit" v-show="render" :disabled="disableButton">
  
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
import router from '@/router'
import axios from 'axios'

    export default {
     
      mounted:function(){
        this.createPost()
      },
      data(){
        return {
          previewUrl:'',
          title:'',
          content:'',
          image:'',
          descriptionImage:'',
          render:false,
          disableButton:false
        }
      },
      methods : {

      
        stateOfFile(e){
          
        const file = e.target.files[0]
  
        if (!file ) {
          return false
        }
        if (!file.type.match('image.*')) {
          return false
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
            const errorOnDescription = document.getElementById('descriptionerrormsg')
    
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

            if( this.descriptionImage === ""){
              errorOnDescription.textContent = "Ce champ ne peut-être vide"
              errorOnDescription.style.color="red"
  
            }
  
            else {
              errorOnDescription.textContent = ""
            }
            
          } ,

      

          hideSubmitButton(){
            
            if(this.title != "" && this.content != "" && this.descriptionImage != "" )
            
              this.render = true
        

            else
              this.render = false
            
          },

          createPost(){
            const forma = document.querySelector('.create-form')
            forma.addEventListener('submit',() => {
            
            axios({
            method:'post',
            url:'http://localhost:3000/api/posts/createpost',
            data : new FormData(forma),
            withCredentials:true
            })

            .then((response) => {

                this.disableButton= true
                if(response.status === 201)
                setTimeout(() => {
                      router.push('/accueil')
                    },200)
         
            })

            .catch(error => {
            
              switch (error.response.status) 
          {
              case 403:
                  document.cookie.split(';').forEach(function(cookie) {
                  document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                    })
                    router.push('/connexion')
                break;

              case 500:
                  document.cookie.split(';').forEach(function(cookie) {
                  document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                })
                  router.push('/connexion')
              break;
          }
            })


      })
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
    .create-form {
      display: flex;
      flex-direction: column;
      gap:1.5em;   
      padding-top:1.5em
    }
  
    .create-form label {
      line-height: 2.1em;
      font-weight: var(--900);
    
    }
  

  
    .create-form input {
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