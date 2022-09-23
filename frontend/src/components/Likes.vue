<template>

 
  <!-- LIKES -->
    <form action="/affichepost" _method="PUT"  enctype="multipart/form-data" class="aime-form voting" @submit.prevent>
      <button type="submit" id="likebtn" name="test" :disabled="isActive" @click="envoiDeLikes">
        <font-awesome-icon icon="fa-solid fa-thumbs-up" />
        <span id="totalLikes"></span>
      </button>
      <input class="input" type="number" id="input1" v-model="likes" name="likes" hidden >
    
    
  
     
    </form>
    <form action="/affichepost" _method="PUT"  enctype="multipart/form-data" class="aimepas-form" @submit.prevent>
      <button id="dislikebtn" type="submit" @click="envoiDeDisLikes" >
        <font-awesome-icon icon="fa-solid fa-thumbs-down"   />
        <span id="totalDisLikes"></span>
      </button>
  
      <input class="input" type="number" id="input1" v-model="likes" name="likes" hidden >
    </form>
  
  
  </template>
  
  <script>
  
  
  
    const axios = require('axios')
    const searchParams = new URLSearchParams(window.location.search)
    const id = parseInt(searchParams.get('id'))
    export default {
  
    
      data(){
        return {
          likes:0,
          isActive:false
        
       }
      },
  
      mounted:function(){
        this.nombresTotalDeLikes()
        //  this.envoiDeLikes()
        //  this.envoiDeDisLikes()
        // this.notation()
      },
  
      methods : {
  
        nombresTotalDeLikes(){
          const totalLikes = document.getElementById('totalLikes')
          const totalDisLikes = document.getElementById('totalDisLikes')
          axios({
            method:'get',
            url:`http://localhost:3000/api/posts/affichepost/${id}`,
            withCredentials:true
          })
  
          .then(res => {
            totalLikes.textContent = ` ${res.data['data'].likes}`
            totalDisLikes.textContent = ` ${res.data['data'].dislikes}`
          })
        },
  
        envoiDeLikes() {
          const form = document.querySelector('.aime-form')
          const likebtn = document.querySelector('#likebtn')
          const dislikebtn = document.querySelector('#dislikebtn')
          const totalLikes = document.getElementById('totalLikes')
          const totalDisLikes = document.getElementById('totalDisLikes')
          this.likes = 1
          console.log('Likes')
          form.addEventListener('submit',() => {
            axios({
              method:'PUT',
              url:`http://localhost:3000/api/posts/affichepost/${id}`,
              data:new FormData(form),
              withCredentials:true
  
            })
            .then(res =>
            { 
              this.isActive = true
              totalLikes.textContent = ` ${res.data['likes']}`
              totalDisLikes.textContent = ` ${res.data['dislikes']}`
              likebtn.style.color="grey"
            })
          })
  
        },
  
        envoiDeDisLikes() {
          const FORM = document.querySelector('.aimepas-form')
          const likebtn = document.querySelector('#likebtn')
          const dislikebtn = document.querySelector('#dislikebtn')
          const totalLikes = document.getElementById('totalLikes')
          const totalDisLikes = document.getElementById('totalDisLikes')
          this.likes = -1
          console.log('DisLikes')
          FORM.addEventListener('submit',() => {
            axios({
              method:'PUT',
              url:`http://localhost:3000/api/posts/affichepost/${id}`,
              data:new FormData(FORM),
              withCredentials:true
  
            })
            .then(res =>
            { 
  
              console.log(res)
              // totalLikes.textContent = ` ${res.data['data'].likes}`
              // totalDisLikes.textContent = ` ${res.data['data'].dislikes}`
              // this.isActive = true
              // likebtn.style.color="grey"
            })
          })
  
        }
      
    },
  
      
    }
  </script>
  
  <style scoped>
  .input{
    width: 50px;
    border:none;
    background-color: white;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
  
  button {
     background: none;
    border: none; 
  }
  
  .fa-thumbs-up{
    color:greenyellow;
    cursor: pointer;
  }
  
  .fa-thumbs-down{
    color:red;
    cursor: pointer;
  }
  
  .aime-form{
    display: flex;
    gap:1.5em;
  }
  </style>