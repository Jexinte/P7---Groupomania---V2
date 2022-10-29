const { Sequelize, DataTypes} = require('sequelize')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()


const sequelize = new Sequelize (
`${process.env.DATABASE}`,
`${process.env.USER}`,
`${process.env.MDP}`,

{
host:`${process.env.HOST}`,
port : `${process.env.PORT}`,
dialect:`${process.env.DIALECT}`,
logging:false
}

)

const USER = UserModel(sequelize,DataTypes)

const initDbUser = () => {

sequelize.sync({force:true}).then(_ =>


bcrypt.hash(`${process.env.PASSWORDADMIN}`,10).then(hash => {


USER.create({

user:`${process.env.ADMIN}`,
imageProfile:'https://c4.wallpaperflare.com/wallpaper/389/857/201/black-moon-werewolf-white-wallpaper-preview.jpg',
email:`${process.env.EMAILADMIN}`,
password:hash,
type:`${process.env.TYPEADMIN}`,
descriptionImage:"Un loup fière"

})

.then(user => console.log(user.toJSON()))

})





)
}

module.exports = {
initDbUser,USER
}