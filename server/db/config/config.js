require('dotenv').load()

module.exports = {
  'development': {
    'username': process.env.DEV_USERNAME,
    'password': process.env.DEV_PASSWORD,
    'database': process.env.DEV_DATABASE,
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'testing': {
    'logging': false,
    'username': process.env.TESTING_USERNAME,
    'password': process.env.TESTING_PASSWORD,
    'database': process.env.TESTING_DATABASE,
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'travis': {
    'username': 'root',
    'password': null,
    'database': 'checkup_travis_testing_db',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
}
