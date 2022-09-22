import router from '@/router'

const axios = require('axios')

export default class Post {
  creationDePost(){
    const form = document.querySelector('form')
    form.addEventListener('submit',() => {
      
     axios({
      method:'post',
      url:'http://localhost:3000/api/posts/creation',
      data : new FormData(form),
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