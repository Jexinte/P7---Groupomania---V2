const AXIOS = require('axios')
import router from '@/router'
export default class Commentaires {
  créationCommentaires(){
    const FORM = document.querySelector('.commentaires-form')
    const SEARCH_PARAMS = new URLSearchParams(window.location.search) 
    const SEARCH_PARAMS_POST_ID =  SEARCH_PARAMS.get('id')
    const IDPOSTPOURLECOMMENTAIRE = parseInt(SEARCH_PARAMS_POST_ID)
    const ERREURBOX = document.getElementById('erreur')
    const ERREURBOXMSG = document.getElementById('erreur-msg')

    FORM.addEventListener('submit',() => {
      AXIOS({
        method:'post',
        url:`http://localhost:3000/api/posts/creationcommentaire/${IDPOSTPOURLECOMMENTAIRE}`,
        data:new FormData(FORM),
        withCredentials:true
      })

      .then(res => {
        if(res.status)
        router.go()
      })

      .catch(error => {

      if(error.response['status'] === 403)
      return window.location.href="/connexion"
  
      })
    })
  }

  
}