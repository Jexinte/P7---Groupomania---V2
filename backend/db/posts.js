const { Sequelize, DataTypes} = require('sequelize')
const postModel = require('../models/posts')
const commentairesModel = require('../models/Commentaires')
const fauxPost = require('../db/fauxposts')
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
const COMMENTAIRES = commentairesModel(sequelize,DataTypes)
const initTablePost = () => {

  sequelize.sync({force:true}).then(_ => {
    fauxPost.map(post => {
      POSTS.create({
        utilisateurId:post.utilisateurId,
        titre:post.titre,
        imageUrl:post.imageUrl,
        contenu:post.contenu,
        auteur:post.auteur
      })
    })
  })
}

module.exports = {
  initTablePost,POSTS,COMMENTAIRES
}