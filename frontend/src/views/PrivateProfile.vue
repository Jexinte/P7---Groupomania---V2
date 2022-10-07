<template>
  <Menu_Profile></Menu_Profile>
  <div class="container-profile">
    <div class="userprofilebox">
      <img class="userprofilebox--img" src="" alt="">
      <h1 class="userprofilebox--maintitle"></h1>
    
        <p class="userprofile--quote"></p>
      
    </div>

    <div class="posts_user">
      <h2 class="posts_user--maintitle">Derniers posts publiés récemments</h2>
      
    </div>
  </div>
</template>

<script>
import Menu_Profile from "@/components/Menu_Profile.vue"
import User from "@/services/Auth.vue"

const user = new User()
export default {

  mounted:function(){
    user.profileUserActuallyConnected()
  },
  components: {Menu_Profile}
}
</script>

<style scoped>

.container-profile {
  display: flex;
    flex-direction: column;
    gap: 4.5em;
    align-items: center;
    padding-bottom:3em;
    min-height: 100vh;
    text-align: center;
    width: 80%;
    margin: 0 auto;
}
.userprofilebox
{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
    padding-top: 3em;
    padding-bottom: 5em;
}

.userprofilebox .userprofilebox--img {
  width: 20em;
    height: 20em;
    border-radius: 50%;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 50%);
    border: 0.4em solid black;
}

.userprofile--quote{
  font-weight: var(--900);
  font-style:italic;
}

.userprofilebox--maintitle{
  font-size: 3em;
}


/* posts_user */

.posts_user--maintitle{
  font-size: 2em;
   align-self: flex-start;
    padding-bottom: 0.3em;
}

.posts_user{
display: flex;
flex-direction: column;
gap:4.3em;
align-items:center;
width: 80%;
}

.postsbox{
  display: flex;
    flex-direction: column;
    gap: 1.3em;
    align-items: center;
}

.footer{
  display: none;
}

@media screen and (max-width:710px) {

  .userprofilebox{
    padding-top:5em;
  }
  .userprofilebox .userprofilebox--img{
    width: 10em;
    height: 10em;
  }

  .userprofilebox--maintitle{
    font-size: 2.5em;
  }

  .userprofile--quote{
    font-size: 12px;
  }

  .posts_user--maintitle{
    font-size: 1.5em;
  }
  
}
</style>