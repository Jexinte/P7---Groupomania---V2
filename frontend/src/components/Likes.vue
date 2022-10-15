<template>
  <!-- LIKES -->
    <form action="/affichepost" _method="PUT"   enctype="multipart/form-data" class="likes-form" @submit.prevent>

        <button class="button" type="submit" id="likebtn"  :disabled="isActive"  @click="sendLike" >
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          <span id="totalLikes"></span>
        </button>
        <input class="input" type="number"  v-model="likes" name="like" hidden >

    </form>
</template>

<script>

  const axios = require('axios')
  const searchParams = new URLSearchParams(window.location.search)
  const id = parseInt(searchParams.get('id'))
  export default {

  
    data(){
      return {
        likes:1,
        isActive:false,
        userIdData:'',
        user:''
      
     }
    },

    mounted:function(){
      this.totalNumberOfLikes(),
      this.forbiddenUserAuthorToLikeHisOwnPost(),
      this.forbiddenUserToLikeAgain()
      
    },

    methods : {

      totalNumberOfLikes(){
        const totalLikes = document.getElementById('totalLikes')

        axios({
          method:'get',
          url:`http://localhost:3000/api/posts/displaypost/${id}`,
          withCredentials:true
        })

        .then(res => {
  
          totalLikes.textContent = ` ${res.data['data'].likes}`

        })
      },

      sendLike() {
        const form = document.querySelector('.likes-form')
        const totalLikes = document.getElementById('totalLikes')
 
    
        form.addEventListener('submit',() => {
          axios({
            method:'PUT',
            url:`http://localhost:3000/api/posts/displaypost/like/${id}`,
            data:new FormData(form),
            withCredentials:true

          })
          .then(res =>{ this.isActive = true
             totalLikes.textContent = ` ${res.data['like']}`})

      
        })
        
      },

      
     forbiddenUserAuthorToLikeHisOwnPost(){
      const cookie = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
      this.userIdData = parseInt(cookie.userid)
      axios({
        method:'get',
        url:`http://localhost:3000/api/posts/displaypost/${id}`,
        withCredentials:true
      })

      .then(res => {
        const userIdFromThePost = res.data['data'].userId 
        if(userIdFromThePost === this.userIdData)
          this.isActive = true
      })
     },

     forbiddenUserToLikeAgain(){
      const cookie = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
      this.user = cookie.user
      axios({
        method:'get',
        url:`http://localhost:3000/api/posts/displaypost/${id}`,
        withCredentials:true
      })

      .then(res => {
        
          const usersWhoLovedThePost = res.data['data'].UsersWhoLovedThePost

          if(usersWhoLovedThePost.includes(this.user))
            this.isActive = true
            
          
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

.button {
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

.likes-form{
  display: flex;
  gap:1.5em;
}

@media screen and (max-width:992px){
  #totalLikes {
    font-size: 11px;
  }

  .fa-thumbs-up {
    font-size: 11px;
  }

  .button{
    font-size: 11px;
  }
}
</style>