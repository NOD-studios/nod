#! /usr/local/bin/node

/* eslint import/no-commonjs:0, fp/no-mutation:0 */
const program = require('commander')
const linkLocalPackages = require('../')
const { pipe, tap } = require('ramda')
const { version } = require('../package.json')
const pop = array => array.slice(0, -1)

module.exports = pipe(
  program => program.version(version),
  program =>
    program
      .option('-P, --path [path]', 'change the working path', {
        isDefault: true,
      })
      .option('-p, --package-path [packagePath]', 'change package.json path')
      .action((...args) => {
        const [path, packagePath] = pop(args)
        return linkLocalPackages(
          path || process.cwd(),
          packagePath || process.cwd(),
        ).then(() => process.exit(0))
      }),
  program => program.parse(process.argv),
  program =>
    tap(
      program =>
        !program.args.length &&
        linkLocalPackages(process.cwd(), process.cwd()).then(() =>
          process.exit(0),
        ),
      program,
    ),
)(program)
