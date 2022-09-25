<script>

  const AXIOS = require('axios')

export default class PostThroughId {
  showThePost(){
        const searchParams = new URLSearchParams(window.location.search)
        const idPost = parseInt(searchParams.get('id'))
        const containerPost = document.querySelector('.post')
        AXIOS({
              method:'get',
              url:`http://localhost:3000/api/posts/affichepost/${idPost}`,
              withCredentials:true
        })
        
        .then(res =>{
              
              const h2Post = document.createElement('h2')
              h2Post.className = "h2-post"
              h2Post.textContent = res.data['data'].titre
              containerPost.append(h2Post)
              
              const image = document.createElement('img')
              image.className="image-post"
              containerPost.append(image)
              image.src= res.data['data'].imageUrl
              
              const content = document.createElement('p')
              content.className = "content-post"
              containerPost.append(content)
              content.textContent = res.data['data'].contenu
              
              const authorBox = document.createElement('div')
              authorBox.className = "authorBox"
              containerPost.append(authorBox)
              
              const likes = document.querySelector('.likes-form')
              authorBox.append(likes)
              
              const dateFormat = new Date(res.data['data'].dateDePublication)
              const dateFrenchFormat = dateFormat.toLocaleDateString('fr') 
              const author = document.createElement('p')
              author.className = "author-post"
              authorBox.append(author)
              author.textContent = `Publié par ${res.data['data'].auteur}, le ${dateFrenchFormat}`
              
        })
        

  }
}
</script>