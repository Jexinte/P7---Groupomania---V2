module.exports = (sequelize,DataTypes) => {
  return sequelize.define('post',{
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },

    utilisateurId : {
      type : DataTypes.STRING,
      allowNull:false
    },

    titre : {
      type : DataTypes.CHAR,
      allowNull:false,
  
    },

    imageUrl : {
      type : DataTypes.STRING,
      allowNull:false,
      validate : {
        notEmpty : {
          args:true,
          msg:'Wesh ?!'
        }
      }
      
    },

    contenu : {
      type:DataTypes.TEXT,
      allowNull:false
    },

    auteur : {
      type:DataTypes.CHAR,
      allowNull:false,
    },

    likes : {
        type:DataTypes.INTEGER,
        defaultValue : 0
    },

    dislikes : {
      type:DataTypes.INTEGER,
      defaultValue : 0
  } ,

  utilisateurQuiOntAimés : {
    type : DataTypes.STRING,
    defaultValue:'King,La',
    get() {
      // Permet de récupérer les informations de la propriété "Types" en tableau ['donnéee','donnéee'] depuis la base de données vers l'API
      return this.getDataValue('utilisateurQuiOntAimés').split(',')
    },
      set(value){
        this.setDataValue('utilisateurQuiontAimés',value.join())
      }

  },

  utilisateurQuiNontPasAimés : {
    type : DataTypes.STRING,
    defaultValue:'',

  } ,

  dateDePublication : {
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW
  }
  },
  {
    timestamps:false
  })
}