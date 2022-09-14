module.exports = (req,res,next) => {
  const { SESSION } = require('../db/session')
  const { USER } = require('../db/sequelize')
  
  SESSION.findAll()
  .then(session => {
    const sessionDataChampDeTable = JSON.parse(session[0].dataValues['data'])
    const sessionIdChampDeTable = session[0].dataValues['session_id']

    //* On vérifie que l'identifiant et le nom de l'utilisateur de la session correspondent bien à l'utilisateur qui effectue l'action
    USER.findOne({where:{id:sessionDataChampDeTable.userId}},{where:{utilisateur:sessionDataChampDeTable.utilisateur}})

    .then(correspondance => {
      if(sessionIdChampDeTable && correspondance)
        next() 
    })
 
  })

  .catch(() => {
    return res.status(403).json({message:`Vous n'êtes pas autorisé à accéder à ce contenu ! `})
  })
}