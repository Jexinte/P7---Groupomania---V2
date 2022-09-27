const { Sequelize, DataTypes} = require('sequelize')
const UserModel = require('../models/User')
const fakeUsers = require('./fakeusers')
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

    fakeUsers.map(user => {
      bcrypt.hash(user.password,10).then(hash => {

        USER.create({
          user:user.user,
          email:user.email,
          password:hash,
          type:user.type
        })
        .then(user => console.log(user.toJSON()))
      })
    })


  )
}

module.exports = {
  initDbUser,USER
}