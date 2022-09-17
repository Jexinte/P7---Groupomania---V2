module.exports = (req,res,next) => {
  const { SESSION } = require('../db/session')

  const cookieContent = req.headers.cookie
  const cookie =Object.fromEntries(cookieContent.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent)))

//* Comparaison de l'identifiant de session de la base de données avec celui sauvegardé dans le cookie crée dans le front
  SESSION.findOne({where:{session_id:cookie.idSession}})
  .then(correspondance => {

    if(!correspondance)
    return res.status(403).json({message:`Vous n'êtes pas autorisé à accéder à ce contenu !`})

    else
      next()
    
  })
  
  .catch(() => {

    return res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
})
}