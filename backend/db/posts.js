const { Sequelize, DataTypes} = require('sequelize')
const PostModel = require('../models/posts')
const CommentsModel = require('../models/Comments')
const fauxPost = require('./fakeposts')
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

const POSTS = PostModel(sequelize,DataTypes)
const COMMENTS = CommentsModel(sequelize,DataTypes)
const initDbPost = () => {

  sequelize.sync({force:true}).then(_ => {
    fauxPost.map(post => {
      POSTS.create({
        userId:post.userId,
        title:post.title,
        imageUrl:post.imageUrl,
        content:post.content,
        author:post.author
      })
    })
  })
}

module.exports = {
  initDbPost,POSTS,COMMENTS
}