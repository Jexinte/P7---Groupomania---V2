<template>
  <div class="container-createpost">

    <Menu_Logout></Menu_Logout>
 
    <div class="post">
      <h2 class="h2-post"></h2>
      <img class="image-post">
      <p class="content-post"></p>
      <div class="authorBox">
        <Likes id="likes"></Likes>
        <p class="author-post"></p>
      </div>
      <UpdateAndDeletePost v-show="render"></UpdateAndDeletePost>
     
    </div>
    <div class="comments-informations">
      <CreateComments></CreateComments>
      <DisplayComments>
      </DisplayComments>
    </div>
  </div>
</template>


<script>
import PostThroughId from '@/services/Posts.vue';
import Menu_Logout from '../components/Menu_Logout.vue';
import CreateComments from '@/components/CreateComments.vue';
import DisplayComments from '@/components/DisplayComments.vue'
import Likes from '@/components/Likes.vue'
import UpdateAndDeletePost from '@/components/UpdateAndDeletePost.vue'

  const user = new PostThroughId()
  
  const axios = require('axios')
  const cookie = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
  const searchParams = new URLSearchParams(window.location.search)
  const idPost = parseInt(searchParams.get('id'))
  export default {
    mounted: function () {
        user.showThePost(),
        this.showUpdateAndDeleteComponent(),
        this.adminCommands()

    },

    data(){
      return {
        userIdData:'',
        admin :'',
        type:'',
        render:false
      }
    },

    
    methods: {
      showUpdateAndDeleteComponent(){


 
        this.userIdData = parseInt(cookie.userid)
        axios({
          method:'get',
          url:`http://localhost:3000/api/posts/displaypost/${idPost}`,
          withCredentials:true
        })

        .then(res => {
          const userIdLinkToThePost = res.data['data'].userId 
         if(this.userIdData === userIdLinkToThePost ){
          this.render = true
     
         }
         
          
        })
      },

     
     adminCommands(){
      const cookie = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
            this.admin = cookie.user
            this.type = cookie.type
  
       
          if(this.admin === "Admin" && this.type === "ADMIN"){
   
            this.render = true
          }
          
     
     } ,

    },

 
    components: { Menu_Logout, CreateComments, DisplayComments, Likes, UpdateAndDeletePost }
}
</script>


<style>
    .banner  {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;

  }

  .container-createpost{
    width: 80%;
    margin: 0 auto;
  }

  .post {
    display: flex;
    flex-direction: column;
    gap:1.5em;
  }
  .h2-post{
    font-size: 2.5em;
    line-height: 3em;
    border-bottom: 3px solid black;
    border-width:4px;
    font-weight: var(--900);
    text-align: center;
    transition: font-size ease-in 700ms;
  }

  .image-post{
    width: 100%;
    padding-bottom:2em
  }

  .content-post{
    text-align: left;
    font-weight: var(--700);
    line-height: 3em;
    padding-bottom: 2em;
    border-bottom: 3px solid black;
    transition: font-size ease-in 700ms;
  }

  .authorBox {
    display: grid;
grid-template-columns: repeat(2,1fr);
grid-template-rows: repeat(2,1fr);
grid-template-areas: 
"a b"
"c c"
;
gap:1.5em;
}

#likes {
  grid-area: a;
  place-self: first baseline;
}

.author-post{
  grid-area: b;
  text-align: right;
  transition: font-size ease-in 700ms;
}

.updatedeletepost{
  grid-area: c;
  place-self: center;
}
.comments-informations{
  padding-top:10em;
}

.displaycommentsbox{
  display: flex;
flex-direction: column;
gap: 1.2em;
padding-top: 1.5em;
}
.author {
  font-weight: var(--900);
  transition: all ease-in-out 700ms;
}

.date-comments {
  font-weight: normal;
  transition: all ease-in 700ms;
}

@media screen and (max-width:992px) {

  .h2-post {
    font-size: 1.5em;
    line-height: 2.5em;
    transition: font-size ease-in-out 700ms;
  }

  .content-post{
    font-size: 11px;
    text-align: justify;
    transition: font-size ease-in-out 700ms;
  }

  .author-post{
    font-size: 11px;
    transition: font-size ease-in-out 700ms;
  }

  .author {
    font-size: 11px;
    transition: font-size ease-in-out 700ms;
  }

  .content-comments {
    font-size: 11px;
    transition: font-size ease-in-out 700ms;
  }

  .date-comments{
    font-size: 11px;
    transition: font-size ease-in-out 700ms;
  }

 
}
</style>