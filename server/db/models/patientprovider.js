'use strict'
/**
 * using defauls of sequelize: so actual table name in database will be plural (ends in 's')
 */
module.exports = function (sequelize, DataTypes) {
  var PatientProvider = sequelize.define('PatientProvider', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
