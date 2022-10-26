<template>
  <div class="updatedeletepost">
 
  <a id="update" class="updatedeletepost-button">
    Modifier
  </a>

  <a href="#" id="delete" class="updatedeletepost-button" @click="deletePost" >
    Supprimer
  </a>
  </div>
</template>

<script>
import Posts from '@/services/Posts.vue';
const user = new Posts() 
  export default {
    methods : {
      deletePost(){
        if(window.confirm('Voulez-vous confirmez la suppression de votre post ?!'))
        user.deletePost()
      }
    }
  }
</script>

<style>
  .updatedeletepost{
    display: flex;
    gap:1.3em;
  }
  .updatedeletepost-button{
    padding: .4em .8em;
  }

  #update{
    background-color: var(--grisFoncé);
    border-radius: 10px;
    font-weight: 900;
    color: white;
  }

  #delete{
    background-color: var(--rouge);
    border-radius: 10px;
    font-weight: 900;
    color: white;
  }
</style>