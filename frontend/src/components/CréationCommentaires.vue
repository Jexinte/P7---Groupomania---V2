<template>

  <div class="commentaires-avant-propos">
    <h3>Ajouter un commentaire</h3>
  </div>
    <form action="/commentaires" method="post" enctype="multipart/form-data" class="commentaires-form" @submit.prevent>
      <label for="auteur">
        Auteur <br>
        <input type="text" v-model="auteur" name="auteur" id="auteur" placeholder="John" class="input"> <br>
     
      </label>
      <label for="commentaires">
        Commentaires : <br>
        <textarea name="commentaires" id="commentaires" v-model="commentaires" cols="30" rows="10"></textarea>
      
      </label>
      <br>
      <input type="submit" value="Envoyer" id="submit" class="input">
    </form>



</template>


<script>
  import Commentaires from '@/services/CréationCommentaire';
 const COMMENTAIRES = new Commentaires()

  export default{

    mounted:function(){
      COMMENTAIRES.créationCommentaires()
    },
    data(){
      return {
        auteur : '',
        commentaires:''
      }
    },

    methods : {
      // ITS BROKEN ILL FIX IT LATER
      verificationDesChampsDeFormulaire() {
           
           const ERREURSURLAUTEUR = document.getElementById("erreurauteur");
           const ERREURSURLECOMMENTAIRE = document.getElementById("erreurcommentaires");
 

           if (this.auteur === "") {
             ERREURSURLAUTEUR.textContent = "Le champ ne peut être vide";
             ERREURSURLAUTEUR.style.color = "red";
  
           }

           else {
               ERREURSURLAUTEUR.textContent = "";
           }

           
           if (this.commentaires === "") {
             ERREURSURLECOMMENTAIRE.textContent = "Le champ ne peut être vide";
             ERREURSURLECOMMENTAIRE.style.color = "red";
           
           }
           else {
               ERREURSURLECOMMENTAIRE.textContent = "";
           }

       }
    }
  }
</script>
<style scoped>
  .commentaires-avant-propos{
    padding-bottom: 3em;
  }
  .commentaires-avant-propos h3 {
    border-bottom: 3px solid black;
    font-size: 2em;
    padding-bottom: 1em;
  }

  .commentaires-form{    
    display: flex;
    flex-direction: column;
    gap:1.5em;
    padding-bottom: 3em;
   
  }

  .commentaires-form label {
    line-height: 1.9em;
    font-weight: var(--600);
  }

  .input {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    padding: 13px;
    border:none
  }

  #commentaires{
    width: 100%;
  }



  #submit {
    background: white;
    font-weight: var(--900);
    cursor: pointer;
    padding:.7em
  }
</style>