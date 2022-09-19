const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const {USER} = require('../db/sequelize')
const { COMMENTAIRES } = require('../db/posts')
const { ValidationError } = require('sequelize')
exports.afficheLesPost = (req,res) => {

        POSTS.findAll().then(post => res.status(200).json({message:post}))
      
}

exports.afficheLePost = (req,res) => {
  const { id } = req.params
  

  POSTS.findByPk(id).then(post => res.status(200).json({data:post}))
}

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
             titre : req.body.titre,
             imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
             contenu : req.body.contenu,
             auteur:sessionData.utilisateur
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


// const { POSTS }  = require('../db/posts')

exports.creationCommentaire = (req,res) => {


const id = req.params.id
const idParse = parseInt(id)

//* Il est nécessaire de récuperer les identifiants des posts afin de les faire correspondre avec l'identifiant en paramètre puis associé la réponse au champ "id_post" de la table commentaires

//* MISE A JOUR UNE BONNE PARTIE DU TRAVAIL A ETE EFFECTUEE 

//* V2 : LA CREATION DE COMMENTAIRE FONCTIONNE AU 19/09/2022 côté front et back
POSTS.findOne({where:{id:idParse}}).then(response => {
COMMENTAIRES.create({
  id_post:response.id,
  auteur:req.body.auteur,
  commentaires:req.body.commentaires
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

exports.afficheLesCommentaires = (req,res) => {
  const id = req.params.id
const idParse = parseInt(id)

// COMMENTAIRES.findOne({where:{id_post:idParse}}).then(response => {
//   res.status(200).json({data1:response})
// })

COMMENTAIRES.findAll().then(response => {
  res.status(200).json({data1:response})
})

}