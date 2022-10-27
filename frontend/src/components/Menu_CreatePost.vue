<template>
<header>
<nav>
<ul class="left">
<li><a href="/accueil"><img class="banner-img-createpost_menu" src="@/assets/images/logo.png" alt="Logo Groupomania" ></a></li>
</ul>

<ul class="right">

<li><router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link></li>

</ul>
</nav>

</header>
</template>

<script>
import Logout from '@/services/Auth.vue';
const user = new Logout()
export default {
methods : {
logout() {
user.logout()
}
}
}
</script>
<style scoped>

header {
margin-top: 3em;
}
/* MENU */
nav {
display: flex;
justify-content: space-between;
}

nav a {
padding-right:1em;
padding-top: 2em;
font-weight: var(--700);
color:black
}
.right {
display: flex;
}

.banner-img-createpost_menu{
height: 136px;
position: relative;
bottom:54px;
}
@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;
}
}
</style>