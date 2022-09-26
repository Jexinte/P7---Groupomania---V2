<template>
  <div class="container">

    <Menu_Homepage></Menu_Homepage>
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
     
    </div>
    <div class="everyposts">
      <h1>Derniers posts publiés récemments</h1>
    </div>    
  </div>
</template>

<script>
import Menu_Homepage from '@/components/Menu_Homepage.vue'
import ListOfPosts from '@/services/Posts.vue'
const user = new ListOfPosts()
  export default {
    mounted:function(){
      this.posts()
    },

    methods : {
      posts(){
        user.listsposts()
      }
    },
    components: { Menu_Homepage }
}
</script>

<style>
a:visited {
  color:black;
}

a{
  color:black;
}
  .container {
    width: 80%;
    margin: 0 auto;
    padding-bottom:3em;
  }

  .everyposts{
    display: flex;
    flex-direction: column;
    gap:8.5em;
  }
  
  .everyposts h1 {
    font-size: 2.5em;
    font-weight: var(--900);
  }
  .everyposts-box{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap:1.5em;
  }

  .everyposts-box h2 {
    text-align: center;
    font-size: 2em;
    text-decoration: underline;
    text-decoration-color:red ;
  }
  .everyposts-box
   img{
    width: 100%;
  }


  .everyposts__paragraph{
    width: 600px;
    text-overflow: ellipsis;
    overflow:hidden;
    white-space: nowrap;
    font-weight: var(--600);
  }
  .banner  {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;
    /* border-bottom: 5px solid red; */
  }





















































  .banner img {


























   
    height: 342px;
    width: 347px;
   
  }

  @media screen and (max-width:992px){
    .everyposts__paragraphe{
      display: none;
    }

    .everyposts h1 {
      text-align: center;
    }
  }
</style>