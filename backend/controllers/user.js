const { USER } = require('../db/users')
const { SESSION } = require('../db/session')
const bcrypt = require('bcrypt')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()
let session

//* Création d'un utilisateur
exports.registration = (req,res) => {

  const imageFolderPath = path.resolve('images')
  const deletionOfImageDownloadWhenErrorOccurOnClientForm = fs.readdirSync(imageFolderPath)

  const mailOfUserRegistrating = req.body.mail
  const nameOfUserRegistrating = req.body.user
  const bioOfUserRegistrating = req.body.quote
  const descriptionImageOfUserRegistrating = req.body.descriptionimage
  const imageOfProfile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  const regexMail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)

  bcrypt.hash(req.body.password,10).then(hash => {

    const passwordHash = hash

    if(regexMail.test(mailOfUserRegistrating)){

        USER.create({
          user : nameOfUserRegistrating,
          email : mailOfUserRegistrating,
          password : passwordHash,
          quote:bioOfUserRegistrating,
          imageProfile:imageOfProfile,
          descriptionImage: descriptionImageOfUserRegistrating
        })
        
        .then(user => {
          console.log(user.toJSON())
          res.status(201).json({message:`L'utilisateur ${user.user} a bien été créé`})
        })

        .catch(error => {
          if(error instanceof ValidationError){
            const willBeResolveForValidationError =  () => {
              return new Promise (resolve => {
                setTimeout(() => {
                  
                  fs.unlink(`${imageFolderPath}/${deletionOfImageDownloadWhenErrorOccurOnClientForm.pop()}`,() => {
                  })
                  resolve('Le fichier a bien été supprimé')
                },300)
                
              })
            }
            
            
            const asyncCall = async () => {
               await willBeResolveForValidationError()
             
            }
            
            asyncCall()
            return res.status(400).json({message:error.message})
         
          }
          
          if(error instanceof UniqueConstraintError) {
            const willBeResolveForConstraintError =  () => {
              return new Promise (resolve => {
                setTimeout(() => {
                  
                  fs.unlink(`${imageFolderPath}/${deletionOfImageDownloadWhenErrorOccurOnClientForm.pop()}`,() => {
                  })
                  resolve('Le fichier a bien été supprimé')
                },300)
                
              })
            }
            
            
            const asyncCall2 = async () => {
                await willBeResolveForConstraintError()
             
            }
            
            asyncCall2()
            
            return res.status(400).json({message:error.message})
          }
        })

    }

     else {
      const willBeResolveForEmailRegex =  () => {
        return new Promise (resolve => {
          setTimeout(() => {
           
            fs.unlink(`${imageFolderPath}/${deletionOfImageDownloadWhenErrorOccurOnClientForm.pop()}`,() => {
            })
            resolve('Le fichier a bien été supprimé')
          },300)
         
        })
      }


      const asyncCall3 = async () => {
      await willBeResolveForEmailRegex()
       
      }
     
      asyncCall3()
       return res.status(400).json({message:`Merci d'écrire une adresse mail au format suivant : example@gmail.fr `})
     }

    
  })

//!  SI RIEN NE FONCTIONNE 
  .catch(() => {
    res.status(500).json({message:`${process.env.CRASHSERVER}`})
  })
}


//* Connexion d'un utilisateur
exports.login = (req,res) => {

  let mailOfUserLogin = req.body.mail
   
  
  
  USER.findOne({where:{email:mailOfUserLogin}}).then(user => {

    if(!user)
      return res.status(400).json({message:`Cet utilisateur n'existe pas`})

    bcrypt.compare(req.body.password , user.password).then(password => {
      
      if(!password){

         res.status(401).json({message:`Le mot de passe est incorrect`})
      }
       
 
    else if(password){

      session = req.session
      session.id = req.session.id
      session.userId = user.id
      // session.user= user.user
      session.type = user.type
       res.status(200).json(
        {
          idSession:session.id,
          user:session.user,
          userId:session.userId,
          typeOfUser:session.type
        }
      )

     
    }
      

      
      

    })
    
    .catch(() =>res.status(500).json({message:`${process.env.CRASHSERVER}`}))

  })

  .catch(() => res.status(500).json({message:`${process.env.CRASHSERVER}`}))
}


exports.logout = (req,res) => {
  session.id = req.session.id


  SESSION.findOne({where:{session_id:session.id}})
  .then(match => {
   
    if(match) {

      session.destroy()
      res.status(200).json({message:`Vous avez bien été déconnectez et allez être redirigez vers la page d'accueil`})
    }

  
  })

  .catch(() => {
    return res.status(500).json({message:`${process.env.CRASHSERVER}`})
  })
}



exports.privateProfilData = (req,res) => {
  SESSION.findAll().then(session => {
    const sessionData = JSON.parse(session[0].dataValues['data'])
    
    USER.findOne({where:{id:parseInt(sessionData.userId)}}).then(user => res.status(200).json({
      userId:user.id,
      username:user.user,
      imageProfile:user.imageProfile,
      quote:user.quote,
      descriptionImage:user.descriptionImage
    }))

    .catch(() =>{
      res.status(500).json({message:`${process.env.CRASHSERVER}`})
   } )
  })

  .catch(() =>{
     res.status(500).json({message:`${process.env.CRASHSERVER}`})
  } )

}
