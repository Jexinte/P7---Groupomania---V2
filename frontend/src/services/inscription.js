import router from '@/router'

const axios = require('axios')

export default class Utilisateur {

    inscription(){

    
      const erreurBox = document.getElementById('erreur')
      const erreurBoxMsg = document.getElementById('erreur-msg')
      const form = document.querySelector('form')

      form.addEventListener('submit',(e) => {
      
        
        axios({
          method:'post',
          url:'http://localhost:3000/api/auth/inscription',
          data: new FormData(form)
        })
        
        .then(res => {

          if(res.status === 201){
            erreurBox.style.display="none"
            erreurBoxMsg.textContent = ""
            router.push('/connexion')
          }
        
        })
        
        .catch(error => {

          if(error.response.status)
          {
            erreurBox.style.display="block"
            erreurBoxMsg.textContent = error.response['data'].message.replace('Validation error:','')
          }

        })

      })
      }

  }

