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
if(window.confirm('Êtes-vous sûr de vouloir supprimer votre post ?!'))
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
transition: all ease-out 700ms;
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

@media screen and (max-width:320px){
  .updatedeletepost-button{
    font-size:.8em ;
    transition: font-size ease-out 700ms;
  }
}
</style>