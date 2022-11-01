module.exports = (sequelize,DataTypes) => {
return sequelize.define('sessions',{
session_id: {
type:DataTypes.CHAR,
unique : true
},

expires : {
type:DataTypes.INTEGER,
allowNull:false,


},
data: {
type:DataTypes.CHAR,
allowNull:false
}
},
{
timestamps:false
})
}