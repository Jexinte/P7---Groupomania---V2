<script>
  import router from '@/router'

  const axios = require('axios')

export default class Posts {
  showThePost(){
        const searchParams = new URLSearchParams(window.location.search)
        const idPost = parseInt(searchParams.get('id'))
        const containerPost = document.querySelector('.post')
        axios({
              method:'get',
              url:`http://localhost:3000/api/posts/displaypost/${idPost}`,
              withCredentials:true
        })
        
        .then(res =>{
              console.log(res)
              const h2Post = document.createElement('h2')
              h2Post.className = "h2-post"
              h2Post.textContent = res.data['data'].title
              containerPost.append(h2Post)
              
              const image = document.createElement('img')
              image.className="image-post"
              containerPost.append(image)
              image.src= res.data['data'].imageUrl
              
              const content = document.createElement('p')
              content.className = "content-post"
              containerPost.append(content)
              content.textContent = res.data['data'].content
              
              const authorBox = document.createElement('div')
              authorBox.className = "authorBox"
              containerPost.append(authorBox)
              
              const likes = document.querySelector('.likes-form')
              authorBox.append(likes)
              
              const dateFormat = new Date(res.data['data'].dateOfPublication)
              const dateFrenchFormat = dateFormat.toLocaleDateString('fr') 
              const author = document.createElement('p')
              author.className = "author-post"
              authorBox.append(author)
              author.textContent = `Publié par ${res.data['data'].author}, le ${dateFrenchFormat}`
              
        })
        

  }

  listsposts(){

const containerEveryPosts = document.querySelector('.everyposts')
axios({
  method:'get',
  url:'http://localhost:3000/api/posts/listsposts',
  withCredentials:true
})

.then(res => {
  res.data['message'].map(post => {
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
    
    const content = document.createElement('p')
    content.className = "everyposts__paragraph"
    postBox.append(content)
    content.textContent = post.content
    
    
  })
  
})

.catch(error => {
  // if(error.response['status'] === 403 || 500)
  // return window.location.href="/connexion"
})
}

createPost(){
const form = document.querySelector('form')
form.addEventListener('submit',() => {
  
  axios({
  method:'post',
  url:'http://localhost:3000/api/posts/createpost',
  data : new FormData(form),
    withCredentials:true
  })
  
  .then(res => {
    router.push('/accueil')
  })
  
  .catch(err => {
    if(err)
    console.log(err)
  })
})
}
}
</script>