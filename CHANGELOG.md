# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.5] - 2017-04-18
### Added
- eslint with standard js style
- added testing infrastructure
- cleaned up server.js file
- added testing database

## [0.6] - 2017-04-19
### Added
- .env to load local username // password arguments into local database, for easier collaboration

## [0.7] - 2017-04-19
### Added
- added npm lint cmd for `test/`
- added api queries for the patient table
- added patient unit testing
### BUGS
- need to write integration tests for API endpoints

## [0.8] - 2017-04-19
### Added
- added travis ci integration, for testing all pr

## [0.9] - 2017-04-20
### Added
- M:M relationship between patient and providers, with migration.
- Added bcrypt hashing patient password before saving hook
- adjusted tests
- compare hashed passwords

## [1.0] - 2017-04-20
### Added
- added queries for providers model and patientproviders model
- added unit tests for the new queries
* Last working branch of this version `11/appointmentTable`

# Version 2 -- Using MongoDB
----------------------------
## [2.0.1] - 2017-04-25
### Added
- added mongo & mongoose, took out MySQL and sequelize
- added travis.yml testing and working test files.
### BUGS
- hashPassword not working from patientSchema

## [2.0.2] - 2017-04-27
### Added
- unit tests for patientSchema
- some basic routes & queries for the patient collection
### Fixes
- fixed hashPassword

## [2.0.3] - 2017-04-27
### Added
- added appointmentSchema

## [2.0.4] - 2017-04-27
### Added
- added providerSchema, and basic unit test

## [2.0.5] - 2017-05-01
### Added
- added medicineSchema, and basic unit test

## [2.0.7_2] - 2017-05-02
### Added
- react router 4, login form, redirects correctly to home page after successful logins