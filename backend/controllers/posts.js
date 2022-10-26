const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const {USER} = require('../db/users')
const { ValidationError } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')




//* Affiche la liste des posts
exports.displayPosts = (req,res) => {
        POSTS.findAll({order:[['dateOfPublication','DESC']]}).then(post => res.status(200).json({data1:post}))
        .catch(() => {
         res.status(500).json({message:`${process.env.CRASHSERVER}`})
        })
}



exports.displayPost = (req,res) => {
  const { id } = req.params
  

  POSTS.findByPk(id).then(post => res.status(200).json({data:post}))
  .catch(() => {
  return  res.status(500).json({message:`${process.env.CRASHSERVER}`})
  
  })
}


//* Création d'un post
exports.createPost = (req,res) => {
  

//* Récupération de l'identifiant de l'utilisateur dans le cookie de session afin de le comparer avec celui présent dans la table "utilisateurs"
  SESSION.findAll()
    .then(session => {
      const sessionData = JSON.parse(session[0].dataValues['data'])
      USER.findOne({where:{id:sessionData.userId}})

//* Si correspondance alors la création du post est autorisé
      .then((match) => {

        const idUser = match.dataValues['id']
        const titleOfThePost = req.body.title
        const contentOfThePost = req.body.content
        const authorOfThePost = match.user
        const descriptionImageOfThePost = req.body.descriptionimage
      

      

      POSTS.create(
        {
          userId:idUser,
          title :titleOfThePost,
          imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          content : contentOfThePost,
          author:authorOfThePost,
          descriptionImage:descriptionImageOfThePost
        })
        .then(post => 
          {
            res.status(201).json({data:post})
          })
          
      })

    })
  
    .catch(() => res.status(500).json({message:`${process.env.CRASHSERVER}`}))
}



//* Mis à jour d'un post en fonction de l'identifiant utilisateur lié au post sauf si l'administrateur est connecté alors la donne change
exports.updatePost = (req,res) => {

  const {id} = req.params

   
    POSTS.findByPk(id).then(post => 
      {
        
        SESSION.findAll().then(session => {

          const sessionData =JSON.parse(session[0].dataValues['data'])
 
          if(sessionData.userId === post.userId || sessionData.type === `${process.env.TYPEADMIN}`)
          {   
            //* On met au format json le contenu de la requête
            const postData = JSON.stringify(req.body)
            const post = JSON.parse(postData)
           
            //* On vérifie ici si le contenu de la requête contient des fichiers ou uniquement du texte
            const postObject = req.file ?  {
              ...post,
              imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {...req.body}
            
            POSTS.update({...postObject},{
              where : {id:id}
              })
              .then(_ => {
                POSTS.findByPk(id).then(post => res.status(201).json({message:`Le post suivant a bien été modifié !`,data:post}))
              })
              
              .catch(error => {
                if(error instanceof ValidationError)
                res.status(400).json({message:error.message})
              })
         

          }

          
          })
          
          
          .catch(() => {return res.status(500).json({message:`${process.env.CRASHSERVER}`})})
     })

     
     
     .catch(() => {return res.status(500).json({message:`${process.env.CRASHSERVER}`})})

}



//*  Suppression d'un post par celui qui l'a créé ou par défaut l'administrateur
exports.deletePost = (req,res) => {

  const {id} = req.params
  POSTS.findByPk(id).then(post => {
    const filename = post.imageUrl.split('/images/')[1]
 
    
    SESSION.findAll().then(session => {

      const sessionData =JSON.parse(session[0].dataValues['data'])
    
      if(sessionData.userId === post.userId || sessionData.type === `${process.env.TYPEADMIN}`)
       {   
      
        fs.unlink(`images/${filename}`,() => {
          POSTS.destroy({
            where : {id : id}
          })
          .then(()=> res.status(200).json({message:`Le post a bien été supprimé ! `,data:post}))
      
        })
      }


      
      else{
        return res.status(403).json({message:"Vous n'êtes pas autorisé à accéder à ce contenu !"})
      }


    
  })
  .catch(() => {
    res.status(500).json({message:`${process.env.CRASHSERVER}`})
  })
  
})

.catch(() => {return res.status(500).json({message:`${process.env.CRASHSERVER}`})})
   
}






//* Création d'un like par utilisateur
exports.likeSystem = (req,res) => {
  

  const { id } = req.params
  
  SESSION.findAll().then(session => {
    
              
          //* 1  - Récupération de l'identifiant de session de l'utilisateur actuellement connecté 
        const dataCookie =  session[0].dataValues['data']

          //* 2 - On récupère le post que l'utilisateur est sur le point de noter
          POSTS.findOne({where:{id:id}}).then(post => {
            

            //* 3 - Contient les données du cookie de session ayant le nom de l'utilisateur connecté 
            
            
            let user = JSON.parse(dataCookie) 
       
         
            
            //! Mettre l'identifiant du post dans le tableau des utilisateursQuiOntAimés
            let arrayOfUsersWhoLovedThePost = post.UsersWhoLovedThePost
            
            
        
            let emptyArray = []

            
           
            arrayOfUsersWhoLovedThePost.map(el => {
              let idOfUser = parseInt(el)
             emptyArray.push(idOfUser)
            })

             //! Si l'utilisateur n'est pas dans le tableau correspondant et qu'il aime le post
            if(!emptyArray.includes(user.userId)) {
              emptyArray.push(user.userId)
            
              
                      POSTS.update({UsersWhoLovedThePost:emptyArray},{ where : { id:id }})

                      .then(_ => {

                            POSTS.increment({likes:1},{where:{id:id}})
                                .then(() => 
                                {
                            //       //* On ajoute l'utilisateur dans le tableau
                            
                            POSTS.findByPk(id).then(post =>  res.status(200).json({like:post.likes}))        
                            })

                    
                            
                      })

                      .catch(() => res.status(500).json({message:`${process.env.CRASHSERVER}`}))

          }

        



          else {
            res.status(400).json({message:'Vous ne pouvez aimez un post plus d\'une fois'})
          }
                
                
                })

                .catch(() => {
                  res.status(500).json({message:`${process.env.CRASHSERVER}`})
                })
})

  .catch(() => {
    res.status(500).json({message:`${process.env.CRASHSERVER}`})
  })

}
