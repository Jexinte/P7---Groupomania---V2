const { Sequelize, DataTypes} = require('sequelize')
const PostModel = require('../models/posts')
const CommentsModel = require('../models/Comments')
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

sequelize.sync({force:true}).then(_ => console.log('Les tables POSTS ET COMMENTS ont bien été créées !'))
}

module.exports = {
initDbPost,POSTS,COMMENTS
}