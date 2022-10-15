const {POSTS} = require('../db/posts')
const { COMMENTS } = require('../db/posts')
const { ValidationError } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

//* Création de commentaires
exports.createComments = (req,res) => {


const { id } = req.params

//* Il est nécessaire de récuperer les identifiants des posts afin de les faire correspondre avec l'identifiant en paramètre puis associé la réponse au champ "id_post" de la table commentaires

POSTS.findOne({where:{id:id}}).then(response => {
  const idPostOfUser = response.id
  const authorOfTheComment = req.body.author
  const commentOfTheAuthor = req.body.comment
  COMMENTS.create({
    id_post:idPostOfUser,
    author:authorOfTheComment,
    comment:commentOfTheAuthor
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



