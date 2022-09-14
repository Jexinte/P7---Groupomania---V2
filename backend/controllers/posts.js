const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const {USER} = require('../db/sequelize')
exports.creationDunPost = (req,res) => {
  

//* Récupération de l'identifiant de l'utilisateur dans le cookie de session afin de le comparer avec celui présent dans la table "utilisateurs"
  SESSION.findAll()
    .then(session => {
      const sessionData = JSON.parse(session[0].dataValues['data'])
      USER.findOne({where:{id:sessionData.userId}})

//* Si correspondance alors la création du post est autorisé
      .then(correspondance => {
        if(correspondance){
          const idUser = correspondance.dataValues['id']
           POSTS.create({
             utilisateurId:idUser,
             titre : 'Test',
             imageUrl :'....',
             contenu : `Lorem ipsum.....`,
             auteur:sessionData.utilisateur
           })
           .then(post => {
             return res.status(201).json({data:post})
           })

         
        }
      })
    })
  
  
}