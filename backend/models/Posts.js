module.exports = (sequelize,DataTypes) => {
return sequelize.define('post',{
id: {
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

userId : {
type : DataTypes.INTEGER,
allowNull:false
},

title : {
type : DataTypes.CHAR,
allowNull:false,
validate : {
notEmpty : {
args:true,
msg:'Ce champ ne peut-être vide !'
}
}

},

imageUrl : {
type : DataTypes.STRING,
allowNull:false,
},

descriptionImage :{
type:DataTypes.CHAR,
allowNull:false
},

content : {
type:DataTypes.TEXT,
allowNull:false,
validate : {
notEmpty : {
args:true,
msg:'Ce champ ne peut-être vide !'
}
}

},
author : {
type:DataTypes.CHAR,
allowNull:false,
},

likes : {
type:DataTypes.INTEGER,
defaultValue : 0
},


UsersWhoLovedThePost : {
type : DataTypes.STRING,
get() {
if (!this.getDataValue('UsersWhoLovedThePost')) {
return [];
} else {

//! Permet de récupérer les informations de la propriété "UsersWhoLovedThePost" en tableau ['donnéee','donnéee'] depuis la base de données vers l'API
return this.getDataValue('UsersWhoLovedThePost').split(',');
}

},
set(value){

this.setDataValue('UsersWhoLovedThePost',value.join())


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