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
 
          if(sessionData.userId === post.userId || sessionData.user === `${process.env.ADMIN}` && sessionData.type === `${process.env.TYPE}`)
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
                res.status(404).json({message:error.message})
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
    
      if(sessionData.userId === post.userId || sessionData.user === `${process.env.ADMIN}` && sessionData.type === `${process.env.TYPE}`)
       {   
      
        fs.unlink(`images/${filename}`,() => {
          POSTS.destroy({
            where : {id : id}
          })
          .then(()=> res.status(200).json({message:`Le post a bien été supprimé ! `,data:post}))
      
        })
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
  
  const  {like}  = req.body
  const likesParsed = JSON.parse(like)
  const { id } = req.params
  
  SESSION.findAll().then(session => {
    
              
                //* 1  - Récupération de l'identifiant de session de l'utilisateur actuellement connecté 
              const dataCookie =  session[0].dataValues['data']

          //* 2 - On récupère le post que l'utilisateur est sur le point de noter
          POSTS.findOne({where:{id:id}}).then(post => {
            

            //* 3 - Contient les données du cookie de session ayant le nom de l'utilisateur connecté 
            
            
            let user = JSON.parse(dataCookie) 
            let arrayOfUsersWhoLovedThePost = post.UsersWhoLovedThePost


            //! Si l'utilisateur n'est pas dans le tableau correspondant et qu'il aime le post
            if(!arrayOfUsersWhoLovedThePost.includes(user.user) && likesParsed === 1) {

              arrayOfUsersWhoLovedThePost.push(user.user)

            
                      POSTS.update({UsersWhoLovedThePost:arrayOfUsersWhoLovedThePost},{ where : { id:id }})

                      .then(_ => {

                            POSTS.increment({likes:1},{where:{id:id}})
                                .then(() => 
                                {
                            //       //* On ajoute l'utilisateur dans le tableau
                            
                            POSTS.findByPk(id).then(post =>  res.status(200).json({like:post.likes}))        
                            })

                    
                            
                      })

                      .catch(error => res.status(404).json({message:error}))

          }



          else {
            res.status(404).json({message:'Vous ne pouvez aimez un post plus d\'une fois'})
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
