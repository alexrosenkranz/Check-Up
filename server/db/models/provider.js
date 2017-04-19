'use strict'
module.exports = function (sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    specialty: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Provider
}
