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
    padding: .9em .7em;
  }

  #update{
    background-color: lightgreen;
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