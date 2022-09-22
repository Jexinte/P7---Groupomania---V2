const axios = require('axios')

export default class PostViaIdentifiant {
  afficheLePost(){
    const searchParams = new URLSearchParams(window.location.search)
    const identifiantDuPost = parseInt(searchParams.get('id'))
    const containerPost = document.querySelector('.post')
    axios({
      method:'get',
      url:`http://localhost:3000/api/posts/affichepost/${identifiantDuPost}`,
      withCredentials:true
    })

    .then(res =>{

         const postBox = document.createElement('h2')
         postBox.className = "h2-post"
        postBox.textContent = res.data['data'].titre
         containerPost.append(postBox)
     
         const image = document.createElement('img')
         image.className="image-post"
         containerPost.append(image)
         image.src= res.data['data'].imageUrl
        
         const contneu = document.createElement('p')
         contneu.className = "contenu-post"
         containerPost.append(contneu)
         contneu.textContent = res.data['data'].contenu
        const auteurBox = document.createElement('div')
        auteurBox.className = "auteurbox"
        containerPost.append(auteurBox)
         const AUTEUR = document.createElement('p')
         AUTEUR.className = "auteur-post"
         auteurBox.append(AUTEUR)
         AUTEUR.textContent = `Publié par ${res.data['data'].auteur}, le`

         const date = document.createElement('p')
         date.className = "date-post"
         auteurBox.append(date)
         const dateFormat = new Date(res.data['data'].dateDePublication)
         const dateFrançaise = dateFormat.toLocaleDateString('fr')   
        
         date.textContent = `  ${dateFrançaise}`

      })
 

  }
}