module.exports = (req,res,next) => {

const { SESSION } = require('../db/session')

const cookieContent = req.headers.cookie

const cookie =Object.fromEntries(cookieContent.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
const cookieIdSession = cookie.idsession
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const options = {
host : `${process.env.HOST}`,
port : `${process.env.PORT}`,
user : `${process.env.USER}`,
password : `${process.env.MDP}`,
database:`${process.env.DATABASE}`,
createDatabaseTable:false
}

const sessionStore = new MySQLStore(options)


//* Comparaison de l'identifiant de session de la base de données avec celui sauvegardé dans le cookie crée dans le front
  SESSION.findOne({where:{session_id:cookieIdSession}})
  .then(match => {
    
    if(!match){
      sessionStore.close()
    
      return res.status(403).json({message:`Vous n'êtes pas autorisé à accéder à ce contenu !`})
    } 
      
    else
      next()
    
  })
  
  .catch(() => {

    return res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
})
}