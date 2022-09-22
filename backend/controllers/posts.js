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
  /* TEST*/
  const  {likes}  = req.body
  const likesParsed = JSON.parse(likes)
  const { id } = req.params
  
  SESSION.findAll().then(session => {
    
    
      //* 1  - Récupération de l'identifiant de session de l'utilisateur actuellement connecté 
    const dataCookie =  session[0].dataValues['data']

 //* 2 - On récupère le post que l'utilisateur est sur le point de noter
 POSTS.findOne({where:{id:id}}).then(post => {
   

  //* 3 - Contient les données du cookie de session ayant le nom de l'utilisateur connecté 
  
  
  let utilisateur = JSON.parse(dataCookie) 
  let tableauDesUtilisateursQuiOntAimés = post.utilisateursQuiOntAimés
  let tableauDesUtilisateursQuiNontPasAimés = post.utilisateursQuiNontPasAimés

  //! Si l'utilisateur n'est pas dans le tableau correspondant et qu'il aime la sauce  
  if(!tableauDesUtilisateursQuiOntAimés.includes(utilisateur.utilisateur) && likesParsed === 1) {

    tableauDesUtilisateursQuiOntAimés.push(utilisateur.utilisateur)

             //* 5 - Mise à jour la colonne correspondante
             POSTS.update({utilisateursQuiOntAimés:tableauDesUtilisateursQuiOntAimés},{ where : { id:id }})
    //* 6 -  Puis on récupère les données du post afin de vérifier que l'ajout s'est bien fait
            .then(_ => {

                  POSTS.increment({likes:1},{where:{id:id}})
                      .then(() => 
                      {
                  //       //* On ajoute l'utilisateur dans le tableau
                  
                    res.status(200).json({message:'La note a bien été prise en compte'})        
                  })

                  .catch(() => res.status(404).json({message:'Vous n\'êtes pas autorisé à noter plus'}))
             
            })

            .catch(error => res.status(404).json({message:error}))
           
    //     //* 4 -  On incrémente le compteur  de 1
         
            
        
}


//! Si l'utilisateur n'aime plus la sauce et qu'il est déjà présent dans le tableau
else if(tableauDesUtilisateursQuiOntAimés.includes(utilisateur.utilisateur) && likesParsed === 0) {

  //* 1- On recherche d'abord l'utilisateur qui retire son like 
  const correspondance = tableauDesUtilisateursQuiOntAimés.find(utilisateurs => utilisateurs === utilisateur.utilisateur)

  //*2 - Si on a une correspondance on récupère
  if(correspondance){
    const indexDeLutilisateurEnCoursDeSuppression = tableauDesUtilisateursQuiOntAimés.findIndex(tableau => {
      return tableau === utilisateur.utilisateur
    })

    tableauDesUtilisateursQuiOntAimés.splice(indexDeLutilisateurEnCoursDeSuppression,1)
    
  }
 

           //* 5 - Mise à jour la colonne correspondante
           POSTS.update({utilisateursQuiOntAimés:tableauDesUtilisateursQuiOntAimés},{
            where : {
              id:id
            }
          })
  //* 6 -  Puis on récupère les données du post afin de vérifier que l'ajout s'est bien fait
          .then(_ => {

            POSTS.increment({likes:-1},{where:{id:id}})
                .then(() => 
                {
            //       //* On ajoute l'utilisateur dans le tableau
            
            POSTS.findByPk(id).then(post=> res.status(200).json(post))
          
                    
            })
              
       .catch(() => res.status(500).json({message:'Veuillez réessayez dans quelques instants !'}))
           
          })
         
  //     //* 4 -  On incrémente le compteur  de 1
       
          
      
}

//! Si l'utilisateur décide de retirer son dislike alors 
else if(tableauDesUtilisateursQuiNontPasAimés.includes(utilisateur.utilisateur) && likesParsed === 0) {

  //* 1- On recherche d'abord l'utilisateur qui retire son like 
  const correspondance = tableauDesUtilisateursQuiNontPasAimés.find(utilisateurs => utilisateurs === utilisateur.utilisateur)

  //*2 - Si on a une correspondance on récupère
  if(correspondance){
    const indexDeLutilisateurEnCoursDeSuppression = tableauDesUtilisateursQuiNontPasAimés.findIndex(tableau => {
      return tableau === utilisateur.utilisateur
    })

    tableauDesUtilisateursQuiNontPasAimés.splice(indexDeLutilisateurEnCoursDeSuppression,1)
    
  }
 

           //* 5 - Mise à jour la colonne correspondante
           POSTS.update({utilisateursQuiNontPasAimés:tableauDesUtilisateursQuiNontPasAimés},{
            where : {
              id:id
            }
          })
  //* 6 -  Puis on récupère les données du post afin de vérifier que l'ajout s'est bien fait
          .then(_ => {

            POSTS.increment({dislikes:-1},{where:{id:id}})
                .then(() => 
                {
            //       //* On ajoute l'utilisateur dans le tableau
            
            POSTS.findByPk(id).then(post=> res.status(200).json(post))
          
                    
            })
              
       .catch(() => res.status(500).json({message:'Veuillez réessayez dans quelques instants !'}))
           
          })
         
  //     //* 4 -  On incrémente le compteur  de 1
       
          
      
}

//! Si l'utilisateur n'aime pas la sauce et qu'il n'est pas dans le tableau
 else if(!tableauDesUtilisateursQuiNontPasAimés.includes(utilisateur.utilisateur) && likesParsed === -1) {

  tableauDesUtilisateursQuiNontPasAimés.push(utilisateur.utilisateur)

           //* 5 - Mise à jour la colonne correspondante
           POSTS.update({utilisateursQuiNontPasAimés:tableauDesUtilisateursQuiNontPasAimés},{
            where : {
              id:id
            }
          })
  //* 6 -  Puis on récupère les données du post afin de vérifier que l'ajout s'est bien fait
          .then(_ => {

            POSTS.increment({dislikes:1},{where:{id:id}})
                .then(() => 
                {

            
            POSTS.findByPk(id).then(post=> res.status(200).json(post))
          
                    
            })
              
       .catch(() => res.status(500).json({message:'Veuillez réessayez dans quelques instants !'}))
           
          })
         
  //     //* 4 -  On incrémente le compteur  de 1
       
          
      
}

else {
  res.status(404).json({message:'Non'})
}
      
       
      })

       .catch(err => res.status(500).json({message:err}))
  })

   .catch(err => res.status(500).json({message:err}))




  


}
