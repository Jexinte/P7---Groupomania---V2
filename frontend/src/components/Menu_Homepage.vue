<template>
<header>
<nav>
<ul class="left">
<li><a href="/accueil"><img class="banner-img-homepage_menu" src="@/assets/images/logo.png" alt="Logo Groupomania" ></a></li>
</ul>

<ul class="right">
<li><a id="profil"><font-awesome-icon icon="fa-solid fa-user" /></a></li>
<li><router-link to="/creationpost"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></li>
<li><router-link to="/" @click="logout"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link></li>

</ul>
</nav>
</header>
</template>

<script>
import Logout from '@/services/Auth.vue';
const user = new Logout()
export default {
mounted:function(){
user.profileUserId()
},
methods : {
logout() {
user.logout()
}
}
}
</script>
<style scoped>
header{
margin-top: 3em;
}
/* MENU */
nav {
display: flex;
justify-content: space-between;
}

nav a {
padding-right:2em;
padding-top: 2em;
font-weight: var(--700);
color:black
}

.right {
display: flex;
}

.banner-img-homepage_menu{
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

@media screen and (min-width:0px) and (max-width:900px){
.right {
display: flex;
justify-content: space-between;
}

.right a {
font-size: .9em;
}

}


</style>