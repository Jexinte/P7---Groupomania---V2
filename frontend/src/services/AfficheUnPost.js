const AXIOS = require('axios')

export default class PostViaIdentifiant {
  afficheLePost(){
    const SEARCH_PARAMS = new URLSearchParams(window.location.search)
    const IDENTIFIANTDUPOST = parseInt(SEARCH_PARAMS.get('id'))
    const CONTAINERPOST = document.querySelector('.post')
    AXIOS({
      method:'get',
      url:`http://localhost:3000/api/posts/affichepost/${IDENTIFIANTDUPOST}`,
      withCredentials:true
    })

    .then(res =>{

         const POSTBOX = document.createElement('h2')
         POSTBOX.className = "h2-post"
        POSTBOX.textContent = res.data['data'].titre
         CONTAINERPOST.append(POSTBOX)
     
         const IMAGE = document.createElement('img')
         IMAGE.className="image-post"
         CONTAINERPOST.append(IMAGE)
         IMAGE.src= res.data['data'].imageUrl
        
         const CONTENU = document.createElement('p')
         CONTENU.className = "contenu-post"
         CONTAINERPOST.append(CONTENU)
         CONTENU.textContent = res.data['data'].contenu
        const AUTEURBOX = document.createElement('div')
        AUTEURBOX.className = "auteurbox"
        CONTAINERPOST.append(AUTEURBOX)
         const AUTEUR = document.createElement('p')
         AUTEUR.className = "auteur-post"
         AUTEURBOX.append(AUTEUR)
         AUTEUR.textContent = `Publié par ${res.data['data'].auteur}, le`

         const DATE = document.createElement('p')
         DATE.className = "date-post"
         AUTEURBOX.append(DATE)
         const DATEFORMAT = new Date(res.data['data'].dateDePublication)
         const DATEFRANÇAISE = DATEFORMAT.toLocaleDateString('fr')   
        
         DATE.textContent = `  ${DATEFRANÇAISE}`

      })
 

  }
}