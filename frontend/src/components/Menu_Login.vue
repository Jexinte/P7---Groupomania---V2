<template>
<header>


<nav>
<ul class="left">
<li><a href="/"><img class="banner-img-login" src="@/assets/images/logo.png" alt="Logo Groupomania" ></a></li>
</ul>

<ul class="right">

<li><router-link to="/">Inscription</router-link></li>

</ul>
</nav>
</header>
</template>

<style scoped>

header{
margin-top: 3em;
}
/* MENU */
nav {
display: flex;
justify-content: space-between;
}

.banner-img-login{
height: 136px;
position: relative;
bottom:54px;
}


nav a {
padding-right:2em;
padding-top: 2em;
font-weight: var(--700);
color:black
}
@media screen and (max-width:340px){
nav a {
position: relative;
left:9px;

}
}

</style>