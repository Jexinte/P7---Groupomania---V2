<script>

  import router from '@/router'
  
  const axios = require('axios')
  
  export default class User {
    login(){
      const form = document.querySelector('.login-form')
      const errorBox = document.getElementById('error')
      const errorBoxMsg = document.getElementById('error-msg')
      
      axios({
        url:'http://localhost:3000/api/auth/login',
        method:'post',
        data : new FormData(form),
        
        
      })
      
      
      .then(res => {
        console.log(res.data['typeOfUser'])
        if(res.status === 200){
          errorBox.style.display="none"
          errorBoxMsg.textContent = ""
          //! Cette redirection est temporaire le temps de faire des test 
          document.cookie=`idSession=${res.data['idSession']};`
          document.cookie=`user=${res.data['user']};`
          document.cookie=`userId=${res.data['userId']};`
          document.cookie=`type=${res.data['typeOfUser']};`
          
          router.push('/accueil')
        }
        
      })
      
      .catch(error => {
        
        if(error.response.status)
        {
          errorBox.style.display="block"
          errorBoxMsg.textContent = error.response['data'].message.replace('Validation error:','')
        }
        
      })
    }
  
    registration(){
      
      
      const erreurBox = document.getElementById('error')
      const erreurBoxMsg = document.getElementById('error-msg')
      const form = document.querySelector('form')
      
      form.addEventListener('submit',(e) => {
        
        
        axios({
          method:'post',
          url:'http://localhost:3000/api/auth/registration',
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
      
  
      logout(){
      
      axios({
        method:'post',
        url:'http://localhost:3000/api/auth/logout',
        withCredentials:true
      })
      
      .then(() => {
        // Permet de supprimer l'ensemble des cookies après la déconnexion !
        document.cookie.split(';').forEach(function(cookie) {
          document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        });
        
        
        return window.location.href="/"
      })
      
    }
    
  }
  </script>