'use strict'
module.exports = function (sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Patient
}
