module.exports = (sequelize,DataTypes) => {
  return sequelize.define('commentaires',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },

    id_post : {
      type:DataTypes.INTEGER,
      allowNull:false
    },

    author : {
      type:DataTypes.CHAR,
      allowNull:false,
      validate : {
        notEmpty : {
          args:true,
          msg:'Le champ auteur ne peut être vide !'
        }
      }
    },

    comment : {
      type:DataTypes.TEXT,
      allowNull:false,
      validate : {
        notEmpty : {
          args:true,
          msg:'Le champ commentaires ne peut être vide'
        }
      }
    },

    dateOfPublication : {
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }

  },
  {
    timestamps:false
  })
}