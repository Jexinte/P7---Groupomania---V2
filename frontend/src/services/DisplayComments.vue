<script>

  
  const axios = require('axios')

export default class DisplayComments {
  DisplaysComments(){
    const commentsBox = document.querySelector('.comments-informations')
    const searchParams = new URLSearchParams(window.location.search) 
    const searchParamsPostId =  searchParams.get('id')
    const idPost = parseInt(searchParamsPostId)
    axios({
      method:'get',
      url:`http://localhost:3000/api/posts/affichescommentaires`,
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
                authorParagrah.textContent =`${commentaire.auteur}, `
                displayCommentsBox.append(authorParagrah)
                
                const date = document.createElement('span')
                date.className = "date-comments"
                const dateFormat = new Date(commentaire.dateDePublication)
                const dateFrench = dateFormat.toLocaleDateString('fr')
                authorParagrah.append(date)
                date.textContent = ` le ${dateFrench} : `
                
                const content = document.createElement('p')
                content.className = "content-comments"
                displayCommentsBox.append(content)
                content.textContent = `${commentaire.commentaires} `
                
                
              }
            })
            
          })
        }
      }
      </script>

      