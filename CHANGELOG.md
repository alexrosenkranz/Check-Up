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

## [0.9] - 2017-04-19
### Added
- M:M relationship between patient and providers, with migration.
- Added bcrypt hashing patient password before saving hook
- adjusted tests
### TO DO
- compare hashed passwords