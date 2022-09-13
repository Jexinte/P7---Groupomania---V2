module.exports = (sequelize,DataTypes) => {
  return sequelize.define('utilisateur',
  {
    id : {
        type : DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    utilisateur : {
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

    email : {
      type:DataTypes.CHAR,
      allowNull:false,
      validate : {

        isEmail : {
          args:true ,
          msg : `L'adresse mail n'est pas au bon format !`
        },

        notEmpty : {
          args:true,
          msg : `Ce champ ne peut être vide`
        },
      },

      unique : {
        args : true,
        msg: `Cette adresse mail n'est pas disponible !`
      },

   
    },
    motdepasse : {
      type:DataTypes.CHAR,
      allowNull:false,
      validate : {
        notEmpty : {
          args:true,
          msg : `Ce champ ne peut être vide`
        }
      }
    },

    type : {
      type : DataTypes.STRING,
      defaultValue: "EMPLOYÉ"
    }
  },
  {
    timestamps:false
  })
}