const dotenv = require('dotenv')
dotenv.config()
const users = [

{
  user:`${process.env.ADMIN}`,
  email:`${process.env.EMAILADMIN}`,
  password:`${process.env.PASSWORDADMIN}`,
  type:`${process.env.TYPE}`
},


]

module.exports = users