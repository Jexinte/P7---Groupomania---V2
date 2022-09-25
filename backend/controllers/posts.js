const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const {USER} = require('../db/sequelize')
const { COMMENTS } = require('../db/posts')
const { ValidationError } = require('sequelize')
exports.displayPosts = (req,res) => {

        POSTS.findAll().then(post => res.status(200).json({message:post}))
      
}

exports.displayPost = (req,res) => {
  const { id } = req.params
  

  POSTS.findByPk(id).then(post => res.status(200).json({data:post}))
}

exports.createPost = (req,res) => {
  

//* Récupération de l'identifiant de l'utilisateur dans le cookie de session afin de le comparer avec celui présent dans la table "utilisateurs"
  SESSION.findAll()
    .then(session => {
      const sessionData = JSON.parse(session[0].dataValues['data'])
      USER.findOne({where:{id:sessionData.userId}})

//* Si match alors la création du post est autorisé
      .then(match => {
        if(match){
          const idUser = match.dataValues['id']
  
           POSTS.create({
             userId:idUser,
             title : req.body.title,
             imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
             content : req.body.content,
             author:sessionData.user
           })
           .then(post => {
       
              return res.status(201).json({data:post})
            
           })

           .catch(error => {
          
            res.status(404).json({message:error})
           
           })

         
        }
      })

      .catch(() => {
         res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
      })
    })
  
}



exports.createComments = (req,res) => {


const { id } = req.params
// const idParse = parseInt(id)

//* Il est nécessaire de récuperer les identifiants des posts afin de les faire correspondre avec l'identifiant en paramètre puis associé la réponse au champ "id_post" de la table commentaires

//* MISE A JOUR UNE BONNE PARTIE DU TRAVAIL A ETE EFFECTUEE 

//* V2 : LA CREATION DE COMMENTAIRE FONCTIONNE AU 19/09/2022 côté front et back
POSTS.findOne({where:{id:id}}).then(response => {
COMMENTS.create({
  id_post:response.id,
  author:req.body.author,
  comment:req.body.comment
})

.then(data => res.status(201).json({message:data}))
.catch(error => {
  if(error instanceof ValidationError)
     res.status(404).json({message:error.message})
})
})

.catch(() => {
  res.status(500).json({message:'Veuillez réessayez dans quelques instants !'})
})

}

exports.displayComments = (req,res) => {

COMMENTS.findAll().then(response => {
  res.status(200).json({data1:response})
})
}

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


  //! Si l'utilisateur n'est pas dans le tableau correspondant et qu'il aime la sauce  
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

                  // .catch(() => res.status(404).json({message:'Vous n\'êtes pas autorisé à noter plus'}))
                  
            })

            .catch(error => res.status(404).json({message:error}))
           

         
            
        
}



else {
  res.status(404).json({message:'Vous ne pouvez aimez un post plus d\'une fois'})
}
      
       
      })

       .catch(err => res.status(500).json({message:err}))
  })

   .catch(err => res.status(500).json({message:err}))




  


}
