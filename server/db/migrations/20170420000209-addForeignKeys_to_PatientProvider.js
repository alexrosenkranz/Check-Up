'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    const addPatient = queryInterface.addColumn('PatientProviders', 'Patient_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Patients', // NEED THE STUPID 's' c'mon!!
        key: 'id'
      }
    })

    const addProvider = queryInterface.addColumn('PatientProviders', 'Provider_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Providers',
        key: 'id'
      }
    })
    return Promise.all([addPatient, addProvider])
  },

  down: function (queryInterface, Sequelize) {
    const removePatient = queryInterface.removeColumn('PatientProviders', 'Patient_id')
    const removeProvider = queryInterface.removeColumn('PatientProviders', 'Provider_id')
    return Promise.all([removePatient, removeProvider])
  }
}
