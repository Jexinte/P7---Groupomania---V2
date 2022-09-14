const { Sequelize, DataTypes} = require('sequelize')
const postModel = require('../models/posts')
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

const POSTS = postModel(sequelize,DataTypes)

const initTablePost = () => {

  sequelize.sync({force:true}).then(_ => console.log('La table des posts a bien été créée'))
}

module.exports = {
  initTablePost,POSTS
}