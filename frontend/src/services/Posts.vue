<script>
import router from '@/router'

const axios = require('axios')
const searchParams = new URLSearchParams(window.location.search)
const idPost = parseInt(searchParams.get('id'))

export default class Posts {
  showThePost(){
const updateLink = document.getElementById('update')

axios({
method:'get',
url:`http://localhost:3000/api/posts/displaypost/${idPost}`,
withCredentials:true
})

.then(res =>{

const h2Post = document.querySelector('.h2-post')
      h2Post.textContent = res.data['data'].title


const image = document.querySelector('.image-post')
      image.src= res.data['data'].imageUrl
      image.alt=res.data['data'].descriptionImage

const content = document.querySelector('.content-post')
      content.textContent = res.data['data'].content


const dateFormat = new Date(res.data['data'].dateOfPublication)
const dateFrenchFormat = dateFormat.toLocaleDateString('fr') 
const author = document.querySelector('.author-post')
      author.textContent = `Publié par ${res.data['data'].author}, le ${dateFrenchFormat}`
      updateLink.href=`modifierpost/?idpost=${res.data['data'].id}`

})


.catch(error => {

  switch (error.response.status) 
{
    case 403:
        document.cookie.split(';').forEach(function(cookie) {
        document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          })
          router.push('/connexion')
      break;

    case 500:
        document.cookie.split(';').forEach(function(cookie) {
        document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      })
        router.push('/connexion')
    break;
  }


})


}

listsposts(){

const containerEveryPosts = document.querySelector('.everyposts')
axios({
method:'get',
url:'http://localhost:3000/api/posts/listsposts',
withCredentials:true,
timeout:1000
})

.then(res => {
res.data['data1'].map(post => {
const postBox = document.createElement('a')
postBox.className = "everyposts-box"
postBox.href=`/post?id=${post.id}`

containerEveryPosts.append(postBox)

const h2 = document.createElement('h2')
postBox.append(h2)
h2.textContent = post.title
const image = document.createElement('img')
image.className ="image"
postBox.append(image)
image.src= post.imageUrl
image.alt=post.descriptionImage

const content = document.createElement('p')
content.className = "everyposts__paragraph"
postBox.append(content)
content.textContent = post.content


})

})

.catch(error => {

switch (error.response.status) 
{
    case 403:
        document.cookie.split(';').forEach(function(cookie) {
        document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          })
          router.push('/connexion')
      break;

    case 500:
        document.cookie.split(';').forEach(function(cookie) {
        document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      })
        router.push('/connexion')
    break;
}


})

}




updatePost(){

const form = document.querySelector('.update-form')
const idPostUpdate = parseInt(searchParams.get('idpost'))

form.addEventListener('submit',() => {
axios({
method:'PUT',
url:`http://localhost:3000/api/posts/updatepost/${idPostUpdate}`,
data:new FormData(form),
withCredentials:true
})

.then((res) => {
if(res.status === 201)
router.push('/accueil')
})


})



}

deletePost(){

axios({
method:'DELETE',
url:`http://localhost:3000/api/posts/deletepost/${idPost}`,
withCredentials:true
})

.then(() => 
router.push('/accueil')
)
}



}
</script>