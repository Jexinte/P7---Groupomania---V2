<script>

  import router from '@/router'
  
  const axios = require('axios')
  
  export default class Login {
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
        
        if(res.status === 200){
          errorBox.style.display="none"
          errorBoxMsg.textContent = ""
          //! Cette redirection est temporaire le temps de faire des test 
          document.cookie=`idSession=${res.data['idSession']};`
          document.cookie=`user=${res.data['user']};`
          
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
  }
  </script>