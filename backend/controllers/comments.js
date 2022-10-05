const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const { COMMENTS } = require('../db/posts')
const { ValidationError } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

//* Création de commentaires
exports.createComments = (req,res) => {


const { id } = req.params


//* Il est nécessaire de récuperer les identifiants des posts afin de les faire correspondre avec l'identifiant en paramètre puis associé la réponse au champ "id_post" de la table commentaires

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
res.status(500).json({message:`${process.env.CRASHSERVER}`})
})

}


//* Affichage des commentaires
exports.displayComments = (req,res) => {

COMMENTS.findAll().then(response => {
  res.status(200).json({data1:response})
})
}



//* Suppression de commentaires
exports.deleteComments = (req,res) => {
  const { id } = req.params

  POSTS.findOne({where:{id:id}}).then(post => {

      COMMENTS.findAll().then(comment => {

            const commentsIdPost = comment[0].dataValues['id_post']

            SESSION.findAll().then(session => {

              const sessionData = JSON.parse(session[0].dataValues['data'])
              if(post.id === commentsIdPost && sessionData.user === `${process.env.ADMIN}` && sessionData.type === `${process.env.TYPE}` )
              {
                COMMENTS.destroy({where:{id_post:post.id}}).then(() => {
                  res.status(200).json({message:`Le commentaire a bien été supprimé`})
                })
              }

              else
                res.status(403).json({msg:`Vous n'êtes pas autorisé à effectuer cette action !`})
            })

        })
    })
}
  


