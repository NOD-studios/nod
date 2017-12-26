import npm from 'npm'
import findRoot from 'find-root'
import moduleExists from 'module-exists'
import { join, resolve } from 'path'
import debugFactory from 'debug'

const debug = debugFactory('link-local-packages')

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
    linkLocalPackagesPath,
  } = getPackage(path)

  return Object.assign(
    {},
    peerDependencies || {},
    devDependencies || {},
    dependencies || {},
  )
}

const npmLoad = config =>
  new Promise((resolve, reject) => npm.load(config, resolve))

const npmLink = (packageToLink = '') =>
  new Promise((resolve, reject) => npm.commands.link(packageToLink, resolve))

const dependenciesWithLocalFolders = (
  localPath = cwdPath,
  packagePath = cwdPath,
) =>
  Object.entries(getDependencies(packagePath))
    .map(([name, version]) => join(localPath, name))
    .map(
      checking =>
        [
          debug('dependenciesWithLocalFolders %O', { checking, localPath }),
          checking,
        ][1],
    )
    .filter(moduleExists)
    .map(
      found => [debug('dependenciesWithLocalFolders %O', { found }), found][1],
    )

const linkLocalPackages = (localPath = cwdPath, packagePath = cwdPath) =>
  [
    debug('linking packages %O', { localPath, packagePath }),
    npmLink(dependenciesWithLocalFolders(localPath, packagePath)),
    debug('linked packages %O', { localPath, packagePath }),
  ][1]

const run = (localPath = cwdPath, packagePath = cwdPath) =>
  typeof localPath !== 'string'
    ? Promise.reject(new Error('local path must be string'))
    : [
        debug('localPath', localPath),
        debug('packagePath', packagePath),
        npmLoad().then(
          () =>
            [
              debug('npm loaded'),
              linkLocalPackages(resolve(localPath), resolve(packagePath)),
            ][1],
        ),
      ][2]

export default run
