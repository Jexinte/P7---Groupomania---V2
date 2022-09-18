

const AXIOS = require('axios')

export default class ListeDesPosts{
  listeposts(){
    
    const CONTAINERTOUSLESPOSTS = document.querySelector('.touslesposts')
    AXIOS({
      method:'get',
      url:'http://localhost:3000/api/posts/listeposts',
      withCredentials:true
    })
    
    .then(res => {
      res.data['message'].map(post => {
        const POSTBOX = document.createElement('a')
        POSTBOX.className = "touslesposts-box"
        POSTBOX.href=`/post?id=${post.id}`

        CONTAINERTOUSLESPOSTS.append(POSTBOX)
     
        const H2 = document.createElement('h2')
        POSTBOX.append(H2)
        H2.textContent = post.titre
        const IMAGE = document.createElement('img')
        IMAGE.className ="image"
        POSTBOX.append(IMAGE)
        IMAGE.src= post.imageUrl
        
        const CONTENU = document.createElement('p')
        CONTENU.className = "touslesposts__paragraphe"
        POSTBOX.append(CONTENU)
        CONTENU.textContent = post.contenu


      })

    })

    .catch(error => {
      if(error.response['status'] === 403 || 500)
      return window.location.href="/connexion"
    })
  }
}