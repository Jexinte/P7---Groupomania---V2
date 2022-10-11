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
  