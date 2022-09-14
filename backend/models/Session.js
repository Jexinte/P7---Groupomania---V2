module.exports = (sequelize,DataTypes) => {
  return sequelize.define('sessions',{
    session_id: {
      type:DataTypes.TEXT,
      unique : true
    },

    expires : {
      type:DataTypes.INTEGER,
      allowNull:false,
    
  
    },
  data: {
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps:false
  })
}