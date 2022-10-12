module.exports = (sequelize,DataTypes) => {
  return sequelize.define('utilisateur',
  {
    id : {
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    user : {
      type:DataTypes.CHAR,
      allowNull:false,
      unique : {
        args:true,
        msg : `Ce nom d'utilisateur n'est pas disponible !`
      } ,

      validate : {

        is: {
          args:/^[A-Z]{1}[a-z]{0,9}$/,
          msg :`Le nom d'utilisateur doit commencer par une lettre majuscule , ne peut contenir de chiffres et ne doit pas excéder 10 caractères`
        }
      }
    },
    quote : {
      type:DataTypes.CHAR,
      allowNull:false,
      

      validate : {

        is: {
          args:/^[A-Za-z]/,
          msg :`Le champ citation personnelle ne peut être vide et / ou contenir de chiffres`
        }
      }
    },

    email : {
      type:DataTypes.CHAR,
      allowNull:false,
      validate : {

        isEmail : {
          args:true ,
          msg : `L'adresse mail n'est pas au bon format !`
        },

        notEmpty:true,
         
        
      },
    
      unique : {
        args : true,
        msg: `Cette adresse mail n'est pas disponible !`
      },

   
    },

      
    imageProfile : {
      type : DataTypes.STRING,
      allowNull:false,
    },

    descriptionImage :{
      type:DataTypes.CHAR,
      allowNull:false
    },
  password : {
      type:DataTypes.CHAR,
      allowNull:false,
      validate : {
        notEmpty:true,
      },
    },
    type : {
      type : DataTypes.STRING,
      defaultValue: "EMPLOYE"
    }
  },
  {
    timestamps:false
  })
}