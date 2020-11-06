# Change Log

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [unreleased] - unreleased

### Fixed

- Fixed issue with graphql single dependency requirements by adding it to devDependencies and then adding devDependencies as an external to rollup

### Added

- Added Changelog

### Changed

- Converted project to typescript
- Cleaned up dependencies
- Rewrote rollup.config.js. Added externals to prevent graphql from being included in package.
- Project restructuring

