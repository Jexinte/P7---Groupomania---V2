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
        url:`http://localhost:3000/api/posts/createcomments/${idPostForTheComment}`,
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

  displayComments(){
    const commentsBox = document.querySelector('.comments-informations')
    const searchParams = new URLSearchParams(window.location.search) 
    const searchParamsPostId =  searchParams.get('id')
    const idPost = parseInt(searchParamsPostId)
    axios({
      method:'get',
      url:`http://localhost:3000/api/posts/displaycomments`,
      withCredentials:true
    })
    
    .then(res => {
      
      res.data['data1'].map(commentaire => {
        
        if(idPost === commentaire.id_post){
          
          const displayCommentsBox = document.createElement('div')
          displayCommentsBox.className ="displaycommentsbox"
          commentsBox.append(displayCommentsBox)
          
          const authorParagrah = document.createElement('p')
                authorParagrah.className = "author"
                authorParagrah.textContent =`${commentaire.author}, `
                displayCommentsBox.append(authorParagrah)
                
                const date = document.createElement('span')
                date.className = "date-comments"
                const dateFormat = new Date(commentaire.dateOfPublication)
                const dateFrench = dateFormat.toLocaleDateString('fr')
                authorParagrah.append(date)
                date.textContent = ` le ${dateFrench} : `
                
                const content = document.createElement('p')
                content.className = "content-comments"
                displayCommentsBox.append(content)
                content.textContent = `${commentaire.comment} `
                
                
              }
            })
            
          })
        }
}
</script>