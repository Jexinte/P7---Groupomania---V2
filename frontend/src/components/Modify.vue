<template>
  <div class="container">
  <!-- POSTS -->
  <div class="update-posts">
  
  <!-- MENU -->
  
  <Menu_CreatePost></Menu_CreatePost>
    <!-- BANNER -->
  
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      <h2 id="h2">Modifier un post</h2>
    </div>
  
    <!-- FORMULAIRE -->
    <div class="post">
  
      <form action="/updatepost" _method="put" enctype="multipart/form-data" class="update-form" @submit.prevent="checkEmptyData">
        <label for="title">
          Titre <br>
          <input type="text" id="title" name="title" v-model="title" placeholder="La patience est dure mais sa récompense est pure !" >
          <span id="titleerror" class="errormsg"></span>
        </label>
        
        <label for="image"> 
          Image  <br>
          <input type="file" id="imageFile" name="imageFile" @change="stateOfFile" >
          <img id="output1" :src="previewUrl" v-if="previewUrl" width="100" height="100">
          <p v-else>Aucune image de téléchargée...</p>
    
        </label>
        
        
        <textarea name="content" id="content" v-model="content" cols="30" rows="10" ></textarea>
        <span id="contenterror" class="errormsg"></span>
        <input type="submit" value="Envoyer" id="submit">
        <Error id="error"></Error>
      </form>
  <!-- DES CHOSES SERONT A CHANGER CE JEUDI -->
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
  import UpdatePost from "@/services/Posts.vue"
  const user = new UpdatePost()
  const axios = require('axios')
  
    export default {
      mounted:function(){
        user.updatePost(),
        this.dataOfPostByDefault()
      },
      data(){
        return {
          previewUrl:'',
          title:'',
          content:''
        }
      },
      methods : {
        stateOfFile(e){
          
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
      
        dataOfPostByDefault(){
          const searchParams = new URLSearchParams(window.location.search)
          const idPost = parseInt(searchParams.get('idpost'))
      

          axios({
            method:'get',
            url:`http://localhost:3000/api/posts/displaypost/${idPost}`,
            withCredentials:true
          })

          .then(res => {
            
              this.title = res.data['data'].title
              this.content = res.data['data'].content
          })

        },

        checkEmptyData(){
          const titleErrorMsg = document.getElementById('titleerror')
          const contentErrorMsg = document.getElementById('contenterror')

          if(this.content === ""){
            contentErrorMsg.textContent = "Ce champ ne peut-être vide !"
            contentErrorMsg.style.color = "red"
          }

          else {
            contentErrorMsg.style.display = "none"
          }


          if(this.title === ""){
            titleErrorMsg.textContent = "Ce champ ne peut-être vide !"
            titleErrorMsg.style.color = "red"
          }

          else {
            titleErrorMsg.style.display = "none"
          }
        }
     
      },
      components: {Menu_CreatePost }
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
    .update-form {
      display: flex;
      flex-direction: column;
      gap:1.5em;   
      padding-top:1.5em
    }
  
    .update-form label {
      line-height: 2.1em;
      font-weight: var(--900);
    
    }
  
  
    .update-form input {
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
  
  
    #output2{
      width: 100%;
      padding-bottom: 3em;
    }

  </style>