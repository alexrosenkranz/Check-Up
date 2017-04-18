'use strict'
module.exports = function (sequelize, DataTypes) {
  var PatientProvider = sequelize.define('PatientProvider', {
    Patient_id: DataTypes.INTEGER,
    Provider_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return PatientProvider
}
