module.exports = (req,res,next) => {

  const {SESSION} = require('../db/session')

  //* On récupère le contenu du cookie
  const cookie = req.headers.cookie

  //* On le transforme en objet 
  const cookieObject =Object.fromEntries(cookie.split('; ').map(value=>value.split(/=(.*)/s).map(decodeURIComponent)))
  
  //* On récupère la partie de l'identifiant nécessaire pour la comparaison avec la base de donnée !
  const idSessionOnReqCookie = cookieObject.idsession


  SESSION.findOne({where:{session_id:idSessionOnReqCookie}})
  .then(match => {

    if(!match)
      return res.status(403).json({message:`Vous n'êtes pas autorisée à voir ce contenu`})
      else
      
      next()
  })

  .catch(() => {
    return res.status(500).json({msg:'Veuillez réessayez dans quelques instants !'})
  })


}