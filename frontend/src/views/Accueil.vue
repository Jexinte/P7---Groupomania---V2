<template>
  <div class="container">

    <Menu_Accueil></Menu_Accueil>
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
     
    </div>
    <div class="touslesposts">
      <h1>Derniers posts publiés récemments</h1>
    </div>    
  </div>
</template>

<script>
import Menu_Accueil from '@/components/Menu_Accueil.vue'
import ListeDesPosts from '@/services/AfficheLaListeDesPosts'
const POSTS = new ListeDesPosts()
  export default {
    mounted:function(){
      this.posts()
    },

    methods : {
      posts(){
        POSTS.listeposts()
      }
    },
    components: { Menu_Accueil }
}
</script>

<style>

  .container {
    width: 80%;
    margin: 0 auto;
    padding-bottom:3em;
  }

  .touslesposts{
    display: flex;
    flex-direction: column;
    gap:8.5em;
  }
  
  .touslesposts h1 {
    font-size: 2.5em;
    font-weight: var(--900);
  }
  .touslesposts-box{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap:1.5em;
  }

  .touslesposts-box h2 {
    text-align: center;
    font-size: 2em;
    text-decoration: underline;
    text-decoration-color:red ;
  }
  .touslesposts-box
   img{
    width: 100%;
  }


  .touslesposts__paragraphe{
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
    .touslesposts__paragraphe{
      display: none;
    }

    .touslesposts h1 {
      text-align: center;
    }
  }
</style>