const axios = require('axios')
import router from '@/router'
export default class Commentaires {
  créationCommentaires(){
    const form = document.querySelector('.commentaires-form')
    const searchParams = new URLSearchParams(window.location.search) 
    const searchParamsPostId =  searchParams.get('id')
    const idPostPourLeCommentaire = parseInt(searchParamsPostId)
    const erreurBox = document.getElementById('erreur')
    const erreurBoxMsg = document.getElementById('erreur-msg')

    form.addEventListener('submit',() => {
      axios({
        method:'post',
        url:`http://localhost:3000/api/posts/creationcommentaire/${idPostPourLeCommentaire}`,
        data:new FormData(form),
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