const { Sequelize, DataTypes} = require('sequelize')
const UserModel = require('../models/User')
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

const INITIALISATIONDELABASEDEDONNEES = () => {

  sequelize.sync({force:true}).then(_ => console.log('La table des utilisateurs a bien été créée'))
}

module.exports = {
  INITIALISATIONDELABASEDEDONNEES,USER
}