let passwordValidator = require('password-validator');

// Création d'un schéma de mot de passe
let passwordSchema = new passwordValidator();

// Ajout des règles de formats
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(50)                                  // Maximum length 50
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces




module.exports = (req,res,next) => {
  if(passwordSchema.validate(req.body.password))
      next()
    
  else
      return res.status(400).json({message:"Veuillez saisir un mot de passe ayant au minimum 8 caractères avec :  1 majuscules , 1 minuscules et 1 chiffres"})
   
}