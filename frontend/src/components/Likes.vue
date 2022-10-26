<template>
  <!-- LIKES -->
    <form action="/affichepost" method="post"  enctype="multipart/form-data" class="likes-form" @submit.prevent>

        <button class="button" id="likebtn"  :disabled="isActive"  @click="sendLike" >
         
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          <span id="totalLikes"></span>
          <span class="errorlike" ></span>
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
        likes:0,
        isActive:false,
     }
    },

    mounted:function(){
      this.totalNumberOfLikes()
      
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
        
        
        const totalLikes = document.getElementById('totalLikes')
        const errorLike = document.querySelector('.errorlike')
      

          axios({
            method:'post',
            url:`http://localhost:3000/api/posts/displaypost/like/${id}`,
            
            withCredentials:true

          })
          .then(res =>{ this.isActive = true
             totalLikes.textContent = ` ${res.data['like']}`})
           
    

        .catch((error) => {
         if(error.response.status === 404)
          this.isActive = true
          errorLike.textContent = error.response.data['message']
        })
      

      },

     
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

.errorlike{
  margin-left: 10px;
  color:var(--rouge);
  font-size: 13px;
}

.button {
   background: none;
  border: none; 
}

.fa-thumbs-up{
  color:var(--roseClair);
  cursor: pointer;
  font-size: 1.5em;
  transition: font-size ease-in 700ms;
}

.fa-thumbs-down{
  color:red;
  cursor: pointer;
}

.likes-form{
  display: flex;
  gap:1.5em;
}

#totalLikes {
  position: relative;
bottom: 1px;
left: 2px;
}
@media screen and (max-width:992px){
  #totalLikes {
    font-size: 11px;
  }

  .fa-thumbs-up {
    font-size: 17px;
    transition: font-size ease-out 700ms;
  }

  .button{
    font-size: 11px;
  }
}
</style>