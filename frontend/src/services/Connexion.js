import router from '@/router'

const axios = require('axios')

export default class Connexion {
  connexion(){
 const form = document.querySelector('.connexion-form')
 const erreurBox = document.getElementById('erreur')
 const erreurBoxMsg = document.getElementById('erreur-msg')

    axios({
      url:'http://localhost:3000/api/auth/connexion',
      method:'post',
      data : new FormData(form),


    })


    .then(res => {

      if(res.status === 200){
        erreurBox.style.display="none"
        erreurBoxMsg.textContent = ""
        //! Cette redirection est temporaire le temps de faire des test 
        document.cookie=`idSession=${res.data['idSession']};`
        document.cookie=`idUtilisateur=${res.data['identifiantUtilisateur']};`
   
         router.push('/accueil')
      }
    
    })
    
    .catch(error => {

      if(error.response.status)
      {
        erreurBox.style.display="block"
        erreurBoxMsg.textContent = error.response['data'].message.replace('Validation error:','')
      }

    })
  }
}