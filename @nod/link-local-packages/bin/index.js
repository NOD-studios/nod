#! /usr/local/bin/node
const program = require('commander')
const linkLocalPackages = require('../')
const { version } = require('../package.json')
const pop = array => array.slice(0, -1)

program
  .version(version)

program
  .option('-P, --path [path]', 'change the working path', {isDefault: true})
  .option('-p, --package-path [packagePath]', 'change package.json path')
  .action((...args) => {
    const [path, packagePath] = pop(args)
    return linkLocalPackages(path || process.cwd(), packagePath || process.cwd())
  })

module.exports = program.parse(process.argv)

if (!program.args.length)
  linkLocalPackages(process.cwd(), process.cwd())
