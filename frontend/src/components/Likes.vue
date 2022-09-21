<template>
  <form action="/affichepost"  enctype="multipart/form-data" class="aime-form" @submit.prevent>
   <button id="likebtn">
    <font-awesome-icon icon="fa-solid fa-thumbs-up" @click="compteur" />
   </button>
   <input type="number" name="input1" id="input1" v-model="compteurAime" >
  </form>
</template>

<script>
  export default {
    data(){
      return {
        compteurAime:0      }
    },

    methods : {
      compteur(){
        this.compteurAime++
      }
    }
  }
</script>

<style scoped>
  #input1 {
    outline:none;
    background: none;
    -moz-appearance: textfield;
    color:green;
  }

  button{
    background-color: white;
    color:blue
  }
</style>