
<script>

  const axios = require('axios')

export default class ListOfPosts{
  listeposts(){
    
    const containerEveryPosts = document.querySelector('.everyposts')
    axios({
      method:'get',
      url:'http://localhost:3000/api/posts/listsposts',
      withCredentials:true
    })
    
    .then(res => {
      res.data['message'].map(post => {
        const postBox = document.createElement('a')
        postBox.className = "everyposts-box"
        postBox.href=`/post?id=${post.id}`
        
        containerEveryPosts.append(postBox)
        
        const h2 = document.createElement('h2')
        postBox.append(h2)
        h2.textContent = post.title
        const image = document.createElement('img')
        image.className ="image"
        postBox.append(image)
        image.src= post.imageUrl
        
        const content = document.createElement('p')
        content.className = "everyposts__paragraph"
        postBox.append(content)
        content.textContent = post.content
        
        
      })
      
    })
    
    .catch(error => {
      // if(error.response['status'] === 403 || 500)
      // return window.location.href="/connexion"
    })
  }
}
</script>