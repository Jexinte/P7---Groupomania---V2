<template>
  <router-view></router-view>
  <Footer></Footer>
</template>
<script>
import Footer from './components/Footer.vue';
  export default {
    components:{ Footer }
  }
</script>