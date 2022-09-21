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

COMMENTAIRES.findAll().then(response => {
  res.status(200).json({data1:response})
})
}

exports.likesSystem = (req,res) => {
  
  const  {likes}  = req.body
  const likesParsed = JSON.parse(likes)
  const { id } = req.params
  
  SESSION.findAll().then(session => {
    
    
      //* 1  - Récupération de l'identifiant de session de l'utilisateur actuellement connecté 
    const dataCookie =  session[0].dataValues['data']

 //* 2 - On récupère le post que l'utilisateur est sur le point de noter
 POSTS.findOne({where:{id:id}}).then(post => {
   

  //* 3 - Contient les données du cookie de session ayant le nom de l'utilisateur connecté 
   const utilisateur = JSON.parse(dataCookie) 
   let tableauDesUtilisateursQuiOntAimés = []

  
   //! Si l'utilisateur n'est pas dans le tableau correspondant 
   if(!post.utilisateurQuiOntAimés.includes(utilisateur.utilisateur) && likesParsed === 1) {

    //* 4 -  On incrémente le compteur  de 1
     POSTS.increment({likes:1},{where:{id:id}})
     .then(() => 
     {
      //* On ajoute l'utilisateur dans le tableau
tableauDesUtilisateursQuiOntAimés.push(utilisateur.utilisateur)

    
            //* 5 - Mise à jour la colonne correspondante
                    POSTS.update({utilisateurQuiOntAimés:tableauDesUtilisateursQuiOntAimés},{
                      where : {
                        id:id
                      }
                    })
            //* 6 -  Puis on récupère les données du post afin de vérifier que l'ajout s'est bien fait
                    .then(_ => {
                      POSTS.findByPk(id).then(post=> res.status(200).json(post))
                    })
                    
              
      })
            
    .catch(() => res.status(500).json({message:'Veuillez réessayez dans quelques instants !'}))
            
            
}
          // 7 - Si l'utlisateur essaye d'aimer un post alors qu'il est déjà dans le tableau correspondant
          else{
           res.status(400).json({message:`Un utilisateur ne peut aimer qu'un post à la fois !`})
          
         }

        //  else if(post.utilisateurQuiOntAimés.includes(utilisateur.userId) && likesParsed === 0) {
          
        //  }
       
      })

      .catch(err => res.status(500).json({message:err}))
  })

  .catch(err => res.status(500).json({message:err}))




  


}
