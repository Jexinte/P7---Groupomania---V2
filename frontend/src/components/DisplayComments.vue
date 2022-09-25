<template>
  <div class="comments">
  <h3>Commentaires</h3>

  </div>
</template>

<script>
  import DisplayComments from '@/services/Comments.vue'

  const user = new DisplayComments()
  export default {

    mounted:function(){
      user.displayComments()
    }
  }
</script>


<style scoped>
.comments{
  padding-top: 10em;
}
  .comments h3 {
    text-align: center;
    border-bottom: 3px solid black;
    padding-bottom: 1em;
    font-size: 2em;
  }

  @media screen and (max-width:992px) {
    .comments h3 {
    font-size: 14px;
  }
  }
</style>