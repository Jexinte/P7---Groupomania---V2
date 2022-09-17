import router from '@/router'

const AXIOS = require('axios')

export default class Connexion {
  connexion(){
 const FORM = document.querySelector('.connexion-form')
 const ERREURBOX = document.getElementById('erreur')
 const ERREURBOXMSG = document.getElementById('erreur-msg')

    AXIOS({
      url:'http://localhost:3000/api/auth/connexion',
      method:'post',
      data : new FormData(FORM),


    })


    .then(res => {

      if(res.status === 200){
        ERREURBOX.style.display="none"
        ERREURBOXMSG.textContent = ""
        //! Cette redirection est temporaire le temps de faire des test 
        document.cookie=`idSession=${res.data['idSession']};`
   
         router.push('/accueil')
      }
    
    })
    
    .catch(error => {

      if(error.response.status)
      {
        ERREURBOX.style.display="block"
        ERREURBOXMSG.textContent = error.response['data'].message.replace('Validation error:','')
      }

    })
  }
}