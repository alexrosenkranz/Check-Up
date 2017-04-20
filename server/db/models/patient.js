'use strict'
const bcrypt = require('bcryptjs')

module.exports = function (sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Patient.belongsToMany(models.Provider, {
          through: models.PatientProvider,
          foreignKey: 'Patient_id'
        })
      },
      hashPassword: function (inputPassword) {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10)
          .then((salt, error) => {
            if (error) {
              return reject(error)
            }
            return bcrypt.hash(inputPassword, salt)
          })
          .then((hash, error) => {
            if (error) {
              return reject(error)
            }
            return resolve(hash)
          })
        }) // ends new Promise
      }
    },
    instanceMethods: {
      comparePassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
      }
    },
    hooks: {
      beforeCreateOptions: {},
      beforeCreate: function (pt, beforeCreateOptions, done) {
        const password = JSON.parse(JSON.stringify(pt)).password
        return this.hashPassword(password).then((hash) => {
          pt.password = hash
          done()
        })
      }
    } // ends hooks
  })
  return Patient
}

