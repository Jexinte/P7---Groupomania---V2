const { USER } = require('../db/sequelize')
const { SESSION } = require('../db/session')
const bcrypt = require('bcrypt')
const { ValidationError, UniqueConstraintError } = require('sequelize')
let session
exports.inscription = (req,res) => {

  let adresseMailDeLutilisateurQuiSinscrit = req.body.mail
  let nomDeLutilisateurQuiSinscrit = req.body.utilisateur
  let regexMail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)

  bcrypt.hash(req.body.motdepasse,10).then(hash => {

    let motDePasseHaché = hash

    if(regexMail.test(adresseMailDeLutilisateurQuiSinscrit)){

        USER.create({
          utilisateur : nomDeLutilisateurQuiSinscrit,
          email : adresseMailDeLutilisateurQuiSinscrit,
          motdepasse : motDePasseHaché
        })
        
        .then(utilisateur => res.status(201).json({message:`L'utilisateur ${utilisateur.utilisateur} a bien été créé`}))

        .catch(error => {
          if(error instanceof ValidationError){
            
            return res.status(404).json({message:error.message})
          }
          
          if(error instanceof UniqueConstraintError) {
            return res.status(404).json({message:error.message})
          }
        })

    }

    else 
      return res.status(404).json({message:`Merci d'écrire une adresse mail correcte !`})
    
  })

//!  SI RIEN NE FONCTIONNE 
  .catch(() => {
    res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
  })
}

exports.connexion = (req,res) => {

  let adresseMailDeLutilisateurQuiSeConnecte = req.body.mail
   session = req.session
   session.id = req.session.id

  //* Permet de retrouver l'adresse mail de l'utilisateur qui se connecte avec celui dans la base de données
  USER.findOne({where:{email:adresseMailDeLutilisateurQuiSeConnecte}}).then(utilisateur => {

    if(!utilisateur)
      return res.status(401).json({message:`Cet utilisateur n'existe pas`})
    
    bcrypt.compare(req.body.motdepasse , utilisateur.motdepasse).then(motDePasseNonvalide => {
      session.userId = utilisateur.id
      session.utilisateur = utilisateur.utilisateur
      if(!motDePasseNonvalide) 
      return res.status(401).json({message:`Le mot de passe est incorrect`})
       
      if(session.id && session.userId)
      return res.status(200).json({message:`L'utilisateur ${utilisateur.utilisateur} est bien connecté !`,idSession:session.id,identifiantUtilisateur:session.userId})
      

    })
    
    .catch(error =>res.status(500).json({message:error}))

  })

  .catch(() => res.status(500).json({message:`Veuillez réessayez dans quelques instants`}))
}

exports.déconnexion = (req,res) => {
  session.id = req.session.id

  //* Vérification de la correspondances des identifiants de session avant déconnexion
  SESSION.findOne({where:{session_id:session.id}})
  .then(correspondance => {
    if(correspondance)
      session.destroy()
      res.status(200).json({message:`Vous avez bien été déconnectez et allez être redirigez vers la page d'accueil`})
  })

  .catch(() => {
    return res.status(500).json({message:`Veuillez réessayez dans quelques instants`})
  })
}