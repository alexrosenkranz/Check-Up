'use strict'
module.exports = function (sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    specialty: DataTypes.STRING,
    phone: DataTypes.BIGINT(11)
  }, {
    classMethods: {
      associate: function (models) {
        Provider.belongsToMany(models.Patient, {
          through: models.PatientProvider,
          foreignKey: 'Provider_id'
        })
      }
    }
  })
  return Provider
}
