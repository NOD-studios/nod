const npm = require('npm')
const findRoot = require('find-root')
const moduleExists = require('module-exists')
const { join, resolve } = require('path')
const debug = require('debug')('link-local-packages')

const cwdPath = process.cwd()

const getPackage = (packagePath = cwdPath) => {
  const rootPath = findRoot(packagePath)

  return require(join(rootPath, 'package.json'))
}

const getDependencies = (path = cwdPath, packagePath = cwdPath) => {
  const {
    dependencies,
    devDependencies,
    peerDependencies,
    linkLocalPackagesPath
  } = getPackage(path)

  return Object
    .assign(peerDependencies || {}, devDependencies || {}, dependencies || {})
}

const thrower = error => { throw error }

const npmLoad = config => new Promise((resolve, reject) =>
  npm.load(config, resolve))

const npmLink = (packageToLink = []) => new Promise((resolve, reject) =>
  npm.commands.link(packageToLink, resolve))

const dependenciesWithLocalFolders = (localPath = cwdPath, packagePath = cwdPath) =>
  Object
    .entries(getDependencies(packagePath))
    .map(([ name, version ]) => join(localPath, name))
    .map( checking => [
      debug('dependenciesWithLocalFolders %O', {checking, localPath}),
      checking
    ][1])
    .filter(moduleExists)
    .map(found => [
      debug('dependenciesWithLocalFolders %O', {found}),
      found,
    ][1])

const linkLocalPackages = (localPath = cwdPath, packagePath = cwdPath) =>
  Promise
    .all(dependenciesWithLocalFolders(localPath, packagePath)
      .map(modulePath => [
        debug('loading npm %O', {modulePath}),
        npmLoad()
          .then(() => [
            debug('linking %O', {modulePath}),
            npmLink([modulePath]),
          ][1])
          .then(() => [
            debug('linked %O', {modulePath}),
            modulePath
          ][1])
      ][1]))
    .then(linkedModules => [
      debug('linkedModules %O', {linkedModules}),
      linkedModules,
    ][1])

const run = (localPath = cwdPath, packagePath = cwdPath) =>
  typeof localPath !== 'string'
    ? thrower(new Error('local path must be string'))
    : [
      debug('localPath', localPath),
      debug('packagePath', packagePath),
      linkLocalPackages(resolve(localPath), resolve(packagePath))
    ][2]

module.exports = run
