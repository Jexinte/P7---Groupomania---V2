const { USER } = require('../db/sequelize')
const { SESSION } = require('../db/session')
const bcrypt = require('bcrypt')
const { ValidationError, UniqueConstraintError } = require('sequelize')
let session

exports.registration = (req,res) => {

  let mailOfUserRegistrating = req.body.mail
  let nameOfUserRegistrating = req.body.user
  let regexMail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)

  bcrypt.hash(req.body.password,10).then(hash => {

    let passwordHash = hash

    if(regexMail.test(mailOfUserRegistrating)){

        USER.create({
          user : nameOfUserRegistrating,
          email : mailOfUserRegistrating,
          password : passwordHash
        })
        
        .then(user => res.status(201).json({message:`L'utilisateur ${user.user} a bien été créé`}))

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

exports.login = (req,res) => {

  let mailOfUserLogin = req.body.mail
   
  
  //* Permet de retrouver l'adresse mail de l'utilisateur qui se connecte avec celui dans la base de données
  USER.findOne({where:{email:mailOfUserLogin}}).then(user => {

    if(!user)
      return res.status(401).json({message:`Cet utilisateur n'existe pas`})
    
      //* On ajoute le nom de l'utilisateur ainsi que son identifiant afin de pouvoir s'en servir dans les requêtes pour les posts
    bcrypt.compare(req.body.password , user.password).then(password => {
      
      if(!password) 
      return res.status(401).json({message:`Le mot de passe est incorrect`})
       
      //* Si tout est bon alors on initialise la session 
      else{
        session = req.session
        session.id = req.session.id
        session.userId = user.id
        session.user= user.user
        session.type = user.type
        return res.status(200).json({idSession:session.id,user:session.user,userId:session.userId,typeOfUser:session.type})
      }
      

    })
    
    .catch(error =>res.status(500).json({message:error}))

  })

  .catch(() => res.status(500).json({message:`Veuillez réessayez dans quelques instants`}))
}


exports.logout = (req,res) => {
  session.id = req.session.id

  //* Vérification de la correspondances des identifiants de session avant déconnexion
  SESSION.findOne({where:{session_id:session.id}})
  .then(match => {
   
    if(match) {

      session.destroy()
      res.status(200).json({message:`Vous avez bien été déconnectez et allez être redirigez vers la page d'accueil`})
    }

    else{

      res.status(500).json({message:'Ok'})
    }
  })

  .catch(() => {
    return res.status(500).json({message:`Veuillez réessayez dans quelques instants`})
  })
}


