<template>
  <div class="affichecommentaires">
  <h3>Commentaires</h3>

  </div>
</template>

<script>
  import AfficheCommentaires from '@/services/AfficheCommentaire'
  const UTILISATEUR = new AfficheCommentaires()
  export default {

    mounted:function(){
      UTILISATEUR.AfficheLescommentaires()
    }
  }
</script>


<style scoped>
.affichecommentaires{
  padding-top: 10em;
}
  .affichecommentaires h3 {
    text-align: center;
    border-bottom: 3px solid black;
    padding-bottom: 1em;
    font-size: 2em;
  }
</style>