<script>

  const axios  = require('axios')

export default class Logout {
  logout(){
    
    axios({
      method:'delete',
      url:'http://localhost:3000/api/auth/deconnexion',
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