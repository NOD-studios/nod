import {
  getPackageName,
  defaultTemplate,
  prefixDebugWithPackageName
} from '../'
import test from 'ava'

const packageName = require('./package.json').name
const extraPrefix = 'test'
const templateString = defaultTemplate(extraPrefix, packageName)

test('should prefix properly', t =>
    prefixDebugWithPackageName(
      extraPrefix,
      defaultTemplate,
      extraPrefix => t.is(extraPrefix, templateString),
      packageName))
