const dotenv = require('dotenv')
dotenv.config()
const users = [

{
  user:`${process.env.ADMIN}`,
  quote : `Celui qui ne progresse pas chaque jour recule chaque jour`,
  imageProfile:'https://c4.wallpaperflare.com/wallpaper/389/857/201/black-moon-werewolf-white-wallpaper-preview.jpg',
  email:`${process.env.EMAILADMIN}`,
  password:`${process.env.PASSWORDADMIN}`,
  type:`${process.env.TYPE}`,
  descriptionImage:"Un loup fière"
},


]

module.exports = users