const {POSTS} = require('../db/posts')
const {SESSION} = require('../db/session')
const {USER} = require('../db/sequelize')

exports.afficheLesPost = (req,res) => {

        POSTS.findAll().then(post => res.status(200).json({message:post}))
      
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