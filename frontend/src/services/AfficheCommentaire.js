import router from '@/router'

const AXIOS = require('axios')

export default class AfficheCommentaires {
  AfficheLescommentaires(){
    const COMMENTAIRESBOX = document.querySelector('.affichecommentaires')
    const SEARCH_PARAMS = new URLSearchParams(window.location.search) 
    const SEARCH_PARAMS_POST_ID =  SEARCH_PARAMS.get('id')
    const IDPOSTPOURAFFICHERLECOMMENTAIRE = parseInt(SEARCH_PARAMS_POST_ID)
    AXIOS({
      method:'get',
      url:`http://localhost:3000/api/posts/affichescommentaires`,
      withCredentials:true
    })

    .then(res => {
      
      res.data['data1'].map(commentaire => {
    
        if(IDPOSTPOURAFFICHERLECOMMENTAIRE === commentaire.id_post){

          const AFFICHESCOMMENTAIREBOX = document.createElement('div')
                AFFICHESCOMMENTAIREBOX.className ="affichecommentairesbox"
          COMMENTAIRESBOX.append(AFFICHESCOMMENTAIREBOX)
          
          const AUTEURPARAGRAPH = document.createElement('p')
                AUTEURPARAGRAPH.className = "auteur"
                AUTEURPARAGRAPH.textContent =`${commentaire.auteur}, `
                AFFICHESCOMMENTAIREBOX.append(AUTEURPARAGRAPH)

          const DATE = document.createElement('span')
                DATE.className = "date-commentaires"
                const DATEFORMAT = new Date(commentaire.dateDePublication)
                const DATEFRANÇAISE = DATEFORMAT.toLocaleDateString('fr')
                AUTEURPARAGRAPH.append(DATE)
                DATE.textContent = ` le ${DATEFRANÇAISE} : `

          // const AUTEUR = document.createElement('p')
          //       AUTEUR.className = "auteur-commentaires"
          //       AFFICHESCOMMENTAIREBOX.append(AUTEUR)
          //       AUTEUR.textContent = `${commentaire.auteur} a écrit : `
         
           const CONTENU = document.createElement('p')
                 CONTENU.className = "contenu-commentaires"
                 AFFICHESCOMMENTAIREBOX.append(CONTENU)
                 CONTENU.textContent = `${commentaire.commentaires} `
          
          
        }
      })

    })
  }
}