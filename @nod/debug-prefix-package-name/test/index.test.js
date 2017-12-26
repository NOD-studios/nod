/* eslint import/no-commonjs:0, fp/no-mutation:0, fp/no-unused-expression:0, better/explicit-return:0, fp/no-nil:0 */

import { debugInternal, getPackageName, defaultTemplate } from '../build/lib'
import debugWithPackageName from '../'
import test from 'ava'
import { name as packageName } from './package.json'

const extraPrefix = 'test'
const templateString = defaultTemplate(extraPrefix, packageName)

test('getPackageName', t => t.is(packageName, getPackageName(__dirname)))

test('should prefix properly', t =>
  debugWithPackageName(extraPrefix, packageName, defaultTemplate, debugName => {
    debugInternal({ debugName, templateString })
    return t.is(debugName, templateString)
  }))
