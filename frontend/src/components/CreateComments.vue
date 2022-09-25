<template>

  <div class="commentsbeforehand">
    <h3>Ajouter un commentaire</h3>
  </div>
    <form action="/comments" method="post" enctype="multipart/form-data" class="comments-form" @submit.prevent>
      <label for="author" class="author-comments">
        Auteur <br>
        <input type="text" v-model="author" name="author" id="author" placeholder="John" class="input"> <br>
     
      </label>
      <label for="comments">
        Commentaires : <br>
        <textarea name="comment" id="comments" v-model="comments" cols="30" rows="10"></textarea>
      
      </label>
      <br>
      <input type="submit" value="Envoyer" id="submit" class="input">
    </form>



</template>


<script>
  import Comments from '@/services/CreateComments.vue';
 const comments = new Comments()

  export default{

    mounted:function(){
      comments.createComments()
    },
    data(){
      return {
        author : '',
        comments:''
      }
    },

    methods : {
      // verificationDesChampsDeFormulaire() {
           
      //      const ERREURSURLAUTEUR = document.getElementById("erreurauteur");
      //      const ERREURSURLECOMMENTAIRE = document.getElementById("erreurcommentaires");
 

      //      if (this.auteur === "") {
      //        ERREURSURLAUTEUR.textContent = "Le champ ne peut être vide";
      //        ERREURSURLAUTEUR.style.color = "red";
  
      //      }

      //      else {
      //          ERREURSURLAUTEUR.textContent = "";
      //      }

           
      //      if (this.commentaires === "") {
      //        ERREURSURLECOMMENTAIRE.textContent = "Le champ ne peut être vide";
      //        ERREURSURLECOMMENTAIRE.style.color = "red";
           
      //      }
      //      else {
      //          ERREURSURLECOMMENTAIRE.textContent = "";
      //      }

      //  }
    }
  }
</script>
<style scoped>
  .commentsbeforehand{
    padding-bottom: 3em;
  }
  .commentsbeforehand h3 {
    border-bottom: 3px solid black;
    font-size: 2em;
    padding-bottom: 1em;
  }

  .comments-form{    
    display: flex;
    flex-direction: column;
    gap:1.5em;
    padding-bottom: 3em;
   
  }

  .comments-form label {
    line-height: 1.9em;
    font-weight: var(--600);
  }

  .input {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none
  }

  #comments{
    width: 100%;
  }



  #submit {
    background: white;
    font-weight: var(--900);
    cursor: pointer;
    padding:.7em
  }

  @media screen and (max-width:992px) {
    .commentsbeforehand h3{
      font-size: 14px;
    }


    .input {
      padding: 0;
    }

    ::placeholder{
      font-size: 11px;
    }

    .comments-form label {
      font-size: 11px;
    }

    #submit{
      font-size: 13px;
    }
  }
</style>