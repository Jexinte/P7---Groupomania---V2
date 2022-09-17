
const AXIOS = require('axios')

export default class Post {
  creationDePost(){
    const FORM = document.querySelector('form')
    FORM.addEventListener('submit',() => {
      
     AXIOS({
      method:'post',
      url:'http://localhost:3000/api/posts/creation',
      data : new FormData(FORM),
      // headers : {
      //   Cookie:document.cookie
      // },
      withCredentials:true
     })
     
     .then(res => {
      console.log(res)
     })

     .catch(err => {
      if(err)
        console.log(err)
     })
    })
  }
}