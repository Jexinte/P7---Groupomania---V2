<template>
  <div class="container">

    <Menu_Logout></Menu_Logout>
    <div class="banner">
      <img class="banner-img" src="@/assets/images/logo.png" alt="Logo Groupomania" >
      
    </div>
    <div class="post">
      <Likes id="likes"></Likes>
      
    </div>
    <div class="comments-informations">
      <CreateComments></CreateComments>
      <DisplayComments></DisplayComments>
    </div>
  </div>
</template>


<script>
import PostThroughId from '@/services/DisplayPost.vue';
import Menu_Logout from '../components/Menu_Logout.vue';
import CreateComments from '@/components/CreateComments.vue';
import DisplayComments from '@/components/DisplayComments.vue';
import Likes from '@/components/Likes.vue'

  const POST = new PostThroughId()

  export default {
    mounted: function () {
        POST.showThePost()

    },

 
    components: { Menu_Logout, CreateComments, DisplayComments, Likes }
}
</script>


<style>
    .banner  {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;

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

  .content-post{
    text-align: left;
    font-weight: var(--700);
    line-height: 3em;
    padding-bottom: 2em;
    border-bottom: 3px solid black;
  }

  .authorBox {
    display: flex;
  justify-content: space-between;
}

.comments-informations{
  padding-top:10em;
}

.displaycommentsbox{
  display: flex;
flex-direction: column;
gap: 1.2em;
padding-top: 1.5em;
}
.author {
  font-weight: var(--900);
}

.date-comments {
  font-weight: normal;
}

@media screen and (max-width:992px) {

  .h2-post {
    font-size: 15px;
    line-height: 2.5em;
  }

  .content-post{
    font-size: 11px;
    text-align: justify;
  }

  .author-post{
    font-size: 11px;
  }

  .author {
    font-size: 11px;
  }

  .content-comments {
    font-size: 11px;
  }

  .date-comments{
    font-size: 11px;
  }

 
}
</style>