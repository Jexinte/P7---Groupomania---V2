

const axios = require('axios')

export default class ListeDesPosts{
  listeposts(){
    
    const containerTousLesPosts = document.querySelector('.touslesposts')
    axios({
      method:'get',
      url:'http://localhost:3000/api/posts/listeposts',
      withCredentials:true
    })
    
    .then(res => {
      res.data['message'].map(post => {
        const postBox = document.createElement('a')
        postBox.className = "touslesposts-box"
        postBox.href=`/post?id=${post.id}`

        containerTousLesPosts.append(postBox)
     
        const h2 = document.createElement('h2')
        postBox.append(h2)
        h2.textContent = post.titre
        const image = document.createElement('img')
        image.className ="image"
        postBox.append(image)
        image.src= post.imageUrl
        
        const contenu = document.createElement('p')
        contenu.className = "touslesposts__paragraphe"
        postBox.append(contenu)
        contenu.textContent = post.contenu


      })

    })

    .catch(error => {
      // if(error.response['status'] === 403 || 500)
      // return window.location.href="/connexion"
    })
  }
}