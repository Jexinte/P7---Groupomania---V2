import router from '@/router'

const axios = require('axios')

export default class AfficheCommentaires {
  AfficheLescommentaires(){
    const commentairesBox = document.querySelector('.affichecommentaires')
    const searchParams = new URLSearchParams(window.location.search) 
    const searchParamsPostId =  searchParams.get('id')
    const idPostPourAfficherLeCommentaire = parseInt(searchParamsPostId)
    axios({
      method:'get',
      url:`http://localhost:3000/api/posts/affichescommentaires`,
      withCredentials:true
    })

    .then(res => {
      
      res.data['data1'].map(commentaire => {
    
        if(idPostPourAfficherLeCommentaire === commentaire.id_post){

          const affichesCommentairesBox = document.createElement('div')
                affichesCommentairesBox.className ="affichecommentairesbox"
          commentairesBox.append(affichesCommentairesBox)
          
          const auteurParagraph = document.createElement('p')
                auteurParagraph.className = "auteur"
                auteurParagraph.textContent =`${commentaire.auteur}, `
                affichesCommentairesBox.append(auteurParagraph)

          const date = document.createElement('span')
                date.className = "date-commentaires"
                const dateFormat = new Date(commentaire.dateDePublication)
                const dateFrançaise = dateFormat.toLocaleDateString('fr')
                auteurParagraph.append(date)
                date.textContent = ` le ${dateFrançaise} : `

          // const AUTEUR = document.createElement('p')
          //       AUTEUR.className = "auteur-commentaires"
          //       affichesCommentairesBox.append(AUTEUR)
          //       AUTEUR.textContent = `${commentaire.auteur} a écrit : `
         
           const contenu = document.createElement('p')
                 contenu.className = "contenu-commentaires"
                 affichesCommentairesBox.append(contenu)
                 contenu.textContent = `${commentaire.commentaires} `
          
          
        }
      })

    })
  }
}