<template>
  <div class="container">

    <Menu_Deconnexion></Menu_Deconnexion>
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      
    </div>
    <div class="post">
      
    </div>
  </div>
</template>


<script>
  import PostViaIdentifiant from '@/services/AfficheUnPost';
import Menu_Deconnexion from '../components/Menu_Deconnexion.vue';
  const POST = new PostViaIdentifiant()
  export default {
    mounted: function () {
        POST.afficheLePost();
    },
    components: { Menu_Deconnexion }
}
</script>


<style>
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
  }

  .image-post{
    width: 100%;
    padding-bottom:2em
  }

  .contenu-post{
    text-align: left;
    font-weight: var(--700);
    line-height: 3em;
    padding-bottom: 2em;
    border-bottom: 3px solid black;
  }
</style>