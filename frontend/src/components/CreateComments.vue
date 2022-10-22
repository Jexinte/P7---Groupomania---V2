<template>

  <div class="commentsbeforehand">
    <h3>Ajouter un commentaire</h3>
  </div>
    <form action="/comments" method="post" enctype="multipart/form-data" class="comments-form" @submit.prevent="checkEmptyData">
      <label for="author" class="author-comments">
        Auteur <br>
        <input type="text" v-model="author" name="author" id="author" placeholder="John" class="input" > <br>
        <span id="authorerrormsg" class="commentserrormsg"></span>
      </label>
      <label for="comments">
        Commentaires : <br>
        <textarea name="comment" id="comments" v-model="comments" cols="30" rows="10" placeholder="Lorem ipsum dolor siret "></textarea>
        <span id="commenterrormsg" class="commentserrormsg"></span>
      
      </label>
      <br>
      <input type="submit" value="Envoyer" id="submit" class="input">
    </form>



</template>


<script>
  import Comments from '@/services/Comments.vue';
 const user = new Comments()

  export default{

    mounted:function(){
      user.createComments()
    },
    data(){
      return {
        author : '',
        comments:''
      }
    },

    methods : {
      checkEmptyData() {
            const errorOnAuthorComments = document.getElementById("authorerrormsg");
            const errorOnCommentContent = document.getElementById("commenterrormsg");
      
   
          
        if(this.author === ""){
          errorOnAuthorComments.textContent = "Le champ ne peut être vide";
          errorOnAuthorComments.style.color = "red";
        }

            else {
                errorOnAuthorComments.textContent = "";
            }

            if (this.comments === "") {
                errorOnCommentContent.textContent = "Le champ ne peut être vide";
                errorOnCommentContent.style.color = "red";
            }

            else {
                errorOnCommentContent.textContent = "";
            }

            
          

        },
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
    border: 1px solid black;
    padding: 13px;
   
  }

  #comments{
    width: 100%;
    border: 1px solid black;
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
      transition: font-size ease-in-out 700ms;
    }


    .input {
      padding: .4em;
      transition: font-size ease-in-out 700ms;
    }

    textarea{
      padding: .4em;
    }

    ::placeholder{
      font-size: 11px;
      transition: font-size ease-in-out 700ms;
    }

    .comments-form label {
      font-size: 11px;
      transition: font-size ease-in-out 700ms;
    }

    #submit{
      font-size: 13px;
      transition: font-size ease-in-out 700ms;
    }
  }
</style>