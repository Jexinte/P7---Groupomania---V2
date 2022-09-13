import router from '@/router'

const AXIOS = require('axios')

export default class Utilisateur {

    inscription(){

    
      const ERREURBOX = document.getElementById('erreur')
      const ERREURBOXMSG = document.getElementById('erreur-msg')
      const FORM = document.querySelector('form')

      FORM.addEventListener('submit',(e) => {
      
        
        AXIOS({
          method:'post',
          url:'http://localhost:3000/api/auth/inscription',
          data: new FormData(FORM)
        })
        
        .then(res => {

          if(res.status === 201){
            ERREURBOX.style.display="none"
            ERREURBOXMSG.textContent = ""
            router.push('/connexion')
          }
        
        })
        
        .catch(error => {

          if(error.response.status)
          {
            ERREURBOX.style.display="block"
            ERREURBOXMSG.textContent = error.response['data'].message.replace('Validation error:','')
          }

        })

      })
      }

  }

