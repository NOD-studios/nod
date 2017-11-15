const moduleExists = require('module-exists')
const linkLocalPackages = require('./index')
const test = require('ava')
const DUMMY_MODULE = 'empty-module'
const { join } = require('path')

test('links properly', t =>
  linkLocalPackages(join(__dirname, 'mock'))
    .then(packages => t.is(typeof packages, 'object')))

test('linked package exists', t =>
  moduleExists(DUMMY_MODULE) && t.pass())
