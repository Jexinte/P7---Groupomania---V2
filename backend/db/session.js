const { Sequelize, DataTypes} = require('sequelize')
const SessionModel = require('../models/Session')
const sequelize = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.USER}`,
  ``,

  {
    host : `${process.env.HOST}`,
    port : `${process.env.PORT}`,
    dialect :`${process.env.DIALECT}`,
    logging:false
  }
)

const SESSION = SessionModel(sequelize,DataTypes)
const initTableSession = () => {


  sequelize.sync({force:true}).then(() => console.log(`Les données de session ont bien été rénitialisées !`))
}

module.exports = {
  initTableSession,SESSION
}