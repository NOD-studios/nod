/* eslint import/no-commonjs:0, fp/no-mutation:0, fp/no-unused-expression:0, better/explicit-return:0, fp/no-nil:0 */

import moduleExists from 'module-exists'
import linkLocalPackages from './'
import test from 'ava'
import { join } from 'path'

const DUMMY_MODULE = 'empty-module'

test('links properly', t =>
  linkLocalPackages(join(__dirname, 'mock')).then(packages =>
    t.is(typeof packages, 'object'),
  ))

test('linked package exists', t => moduleExists(DUMMY_MODULE) && t.pass())
