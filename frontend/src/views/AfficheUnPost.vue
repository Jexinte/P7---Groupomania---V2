<template>
  <div class="container">

    <Menu_Deconnexion></Menu_Deconnexion>
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      
    </div>
    <div class="post">
      <Likes id="likes"></Likes>
    </div>
    <div class="commentaires-informations">
      <Commentaire></Commentaire>
      <AfficheCommentaires></AfficheCommentaires>
    </div>
  </div>
</template>


<script>
import PostViaIdentifiant from '@/services/AfficheUnPost';
import Menu_Deconnexion from '../components/Menu_Deconnexion.vue';
import Commentaire from '@/components/CréationCommentaires.vue';
import AfficheCommentaires from '@/components/AfficheCommentaires.vue';
import Likes from '@/components/Likes.vue'

  const POST = new PostViaIdentifiant()

  export default {
    mounted: function () {
        POST.afficheLePost(),
        this.auteur()

    },

    methods : {
      auteur(){
        const auteurBox = document.querySelector('.auteurbox')
        
        // const likes = document.getElementById('likes')
        // auteurBox.appendChild(likes)
      }
    },
    components: { Menu_Deconnexion, Commentaire, AfficheCommentaires, Likes }
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

  .auteurbox {
    display: flex;

  justify-content: flex-end;
}

.commentaires-informations{
  padding-top:10em;
}

.affichecommentairesbox{
  display: flex;
flex-direction: column;
gap: 1.2em;
padding-top: 1.5em;
}
.auteur {
  font-weight: var(--900);
}

.date-commentaires {
  font-weight: normal;
}
</style>