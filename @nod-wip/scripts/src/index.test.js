/*
  eslint
    import/no-commonjs:0,
    fp/no-mutation:0,
    fp/no-unused-expression:0,
    better/explicit-return:0,
    fp/no-nil:0
 */
// import { run, getScriptIndex, checkAndRunScript, defaultState } from './'
import { defaultState, run } from './'
import { debug } from '@chantelle/util'
import { pipe } from 'ramda'

// const createScriptState = scriptName =>
//   pipe(
//     state => ({
//       ...state,
//       script: scriptName,
//       args: [scriptName],
//     }),
//     getScriptIndex,
//   )(defaultState)

describe('@nod/scripts', () => {
  test('exports correctly', () => {
    ;[run].map(fn => expect(typeof fn).toBe('function'))
  })

  // test('throws error', () =>
  //   expect(() => run(defaultState)).toThrow(/Unknown script/))

  // test('test', () => {
  //   expect(typeof checkAndRunScript(createScriptState('test'))).toBe('object')
  // })
  //
  // test('build', () => {
  //   expect(typeof checkAndRunScript(createScriptState('build'))).toBe('object')
  // })
  //

  test('build', () => {
    expect(typeof run(defaultState)).toBe('object')
  })
})
