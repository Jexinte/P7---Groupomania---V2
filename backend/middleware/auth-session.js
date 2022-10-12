module.exports = (req,res, next) => {
const { SESSION } = require('../db/session')
const {USER} = require('../db/sequelize')
const cookieContent = req.headers.cookie
const cookie =Object.fromEntries(cookieContent.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))

USER.findOne({where:{id:cookie.userid}}).then(user => {
  
  const userId = user['dataValues'].id
  SESSION.findAll().then(session => {
    session.map(session => {
    
      const sessionData = JSON.parse(session.data)
      if(sessionData.userId === userId && session.session_id === cookie.idsession)
        next()
      
      
    })
  })

})

.catch(() => {
  return res.status(403).json({message:'Vous n\'êtes pas autorisé à accéder à ce contenu !'})
})
}

// module.exports = (req,res,next) => {

// const { SESSION } = require('../db/session')

// const cookieContent = req.headers.cookie

// const cookie =Object.fromEntries(cookieContent.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))
// const cookieIdSession = cookie.idsession



// //* Comparaison de l'identifiant de session de la base de données avec celui sauvegardé dans le cookie crée dans le front
//   SESSION.findOne({where:{session_id:cookieIdSession}})
//   .then(match => {
    
//     if(!match){

    
//       return res.status(403).json({message:`Vous n'êtes pas autorisé à accéder à ce contenu !`})
//     } 
      
//     else
//       next()
    
//   })
  
//   .catch(() => {

//     return res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
// })
// }