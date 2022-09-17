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

const INITIALISATIONDELABASEDEDONNEES = () => {

  sequelize.sync({force:true}).then(_ => bcrypt.hash('Mandalorian89000#',10).then(hash => {
    USER.create({
      utilisateur:'Test',
      email:'test@live.fr',
      motdepasse:hash
    })

    .then(user => console.log(user.toJSON()))
  }))
}

module.exports = {
  INITIALISATIONDELABASEDEDONNEES,USER
}