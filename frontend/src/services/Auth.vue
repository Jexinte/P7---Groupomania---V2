<script>

  import router from '@/router'
  
  const axios = require('axios')
  
  export default class User {
  
    registration(){
      
      
      const erreurBox = document.getElementById('error')
      const erreurBoxMsg = document.getElementById('error-msg')
      const form = document.querySelector('form')


      form.addEventListener('submit',() => {
        
        
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
  
      
      
          //   errorBox.style.display="none"
          //   errorBoxMsg.textContent = ""
      

          document.cookie=`idsession=${res.data['idSession']};`
          document.cookie=`user=${res.data['user']};`
          document.cookie=`userid=${res.data['userId']};`
          document.cookie=`type=${res.data['typeOfUser']};`
          
           router.push('/accueil')
      
        
        
      })
      
      .catch(error => {
        
        if(error.response.status)
        {
          errorBox.style.display="block"
          errorBoxMsg.textContent = error.response['data'].message.replace('Validation error:','')
        }
        
      })
    }
  
   
  
      logout(){
      
      axios({
        method:'post',
        url:'http://localhost:3000/api/auth/logout',
        withCredentials:true
      })
      
      .then(() => {
        // Supprime l'ensemble des cookies après déconnexion 
        document.cookie.split(';').forEach(function(cookie) {
          document.cookie = cookie.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        });
        
        router.push('/connexion')
      })
      
    }

    profileUserId(){
      const profile = document.getElementById('profil')
      axios({
        method:'get',
        url:`http://localhost:3000/api/auth/users`,
        withCredentials:true
      })

      .then(res => {
        const cookie = Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
        const userData = res.data
        const emptyArray = []
              emptyArray.push(userData)

        const findCorrectUser = emptyArray.find(user => user.userId === parseInt(cookie.userid))
     
        if(findCorrectUser){

          profile.href=`/profil?idUser=${findCorrectUser.userId}`
        }
          
      })
    }
    

    profileUserActuallyConnected(){
      axios({
        method:'get',
        url:`http://localhost:3000/api/auth/users`,
        withCredentials:true
      })

      .then(res => {
      
        
        
        
        axios({
          method:'get',
          url:`http://localhost:3000/api/posts/listsposts`,
          withCredentials:true
        })
        
        .then(response => {
          
          const searchParams = new URLSearchParams(window.location.search)
          const posts = response.data['data1']
          const idOfUserConnected = parseInt(searchParams.get('idUser')) 
        

          const userData = res.data
        
          const emptyArray = []
                emptyArray.push(userData)
          const findCorrectUser = emptyArray.find(user => user.userId === idOfUserConnected)
          if(findCorrectUser){
          
            const nameOfUserInDatabase = findCorrectUser.username
                    const quoteOfUserInDatabase = findCorrectUser.quote
                    const imageProfileOfUserInDatabase = findCorrectUser.imageProfile


                    const imgProfileBox = document.querySelector('.userprofilebox--img')
                          imgProfileBox.src=`${imageProfileOfUserInDatabase}`
                

                    const nameUserProfileBox = document.querySelector('.userprofilebox--maintitle')
                          nameUserProfileBox.textContent = `${nameOfUserInDatabase}`
                          

                    const quoteUserProfileBox = document.querySelector('.userprofile--quote')
                          quoteUserProfileBox.textContent = `"${quoteOfUserInDatabase}"`
                          quoteUserProfileBox.style.color="slategray"
          }
            posts.filter(post => {
              if(post.userId === findCorrectUser.userId && post.author === findCorrectUser.username){
                 
                    
                    
                    const posts = document.querySelector('.posts_user')
                  
                    const postsBox = document.createElement('a')
                          postsBox.className ="postsbox"
                          postsBox.href=`/post?id=${post.id}`
                          posts.append(postsBox)
                          postsBox.style.display="flex"
                          postsBox.style.flexDirection = "column"
                          postsBox.style.alignItems = "center"
                          postsBox.style.gap = "1.3em"
                    
                    const dateFormat = new Date(post.dateOfPublication)
                    const dateFrenchFormat = dateFormat.toLocaleDateString('fr') 
                          
                    const titlePostBox = document.createElement('h3')
                          titlePostBox.className = "postbox--title"
                          titlePostBox.textContent = `${post.title} , le ${dateFrenchFormat}`
                          titlePostBox.style.fontSize = "1.5em";
                          titlePostBox.style.textDecoration = "underline"
                          titlePostBox.style.textDecorationColor = "red"
                          postsBox.append(titlePostBox)
                    
                    const imagePostBox = document.createElement('img')
                          imagePostBox.className = "postbox--img"
                          imagePostBox.src = `${post.imageUrl}`
                          imagePostBox.style.width="80%"
                          postsBox.append(imagePostBox)
                          
                        
              }

           
            })
            

          
          })
         
    


     
      })
    }
  }
  </script>