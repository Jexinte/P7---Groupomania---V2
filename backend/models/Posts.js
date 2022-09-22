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

  utilisateursQuiOntAimés : {
    type : DataTypes.STRING,
    get() {
      if (!this.getDataValue('utilisateursQuiOntAimés')) {
        return [];
      } else {
        // Permet de récupérer les informations de la propriété "utilisateursQuiOntAimés" en tableau ['donnéee','donnéee'] depuis la base de données vers l'API
        return this.getDataValue('utilisateursQuiOntAimés').split(',');
      }
    
    },
      set(value){
     
          this.setDataValue('utilisateursQuiontAimés',value.join())
       
        
      }

  },

  utilisateursQuiNontPasAimés : {
    type : DataTypes.STRING,
    get() {
      if (!this.getDataValue('utilisateursQuiNontPasAimés')) {
        return [];
      } else {
        // Permet de récupérer les informations de la propriété "utilisateursQuiNontPasAimés" en tableau ['donnéee','donnéee'] depuis la base de données vers l'API
        return this.getDataValue('utilisateursQuiNontPasAimés').split(',');
      }
    
    },
      set(value){
     
          this.setDataValue('utilisateursQuiNontPasAimés',value.join())
       
        
      }

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