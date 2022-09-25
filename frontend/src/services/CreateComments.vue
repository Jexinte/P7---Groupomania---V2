<script>

  const axios = require('axios')
import router from '@/router'
export default class Comments {
  createComments(){
    const form = document.querySelector('.comments-form')
    const searchParams = new URLSearchParams(window.location.search) 
    const searchParamsPostId =  searchParams.get('id')
    const idPostForTheComment = parseInt(searchParamsPostId)
    
    
    form.addEventListener('submit',() => {
      axios({
        method:'post',
        url:`http://localhost:3000/api/posts/creationcommentaire/${idPostForTheComment}`,
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
</script>