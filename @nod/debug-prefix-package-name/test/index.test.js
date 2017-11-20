const {
  debugInternal,
  getPackageName,
  defaultTemplate,
} = require('../lib')
const prefixDebugWithPackageName = require('../')
const test = require('ava')
const packageName = require('./package.json').name

const extraPrefix = 'test'
const templateString = defaultTemplate(extraPrefix, packageName)


test('getPackageName', t => t.is(packageName, getPackageName(__dirname)))

test('should prefix properly', t =>
    prefixDebugWithPackageName(
      extraPrefix,
      defaultTemplate,
      debugName => {
        debugInternal({debugName, templateString})
        return t.is(debugName, templateString)
      },
      packageName))
