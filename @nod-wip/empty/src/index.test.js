/*
  eslint
    import/no-commonjs:0,
    fp/no-mutation:0,
    fp/no-unused-expression:0,
    better/explicit-return:0,
    fp/no-nil:0
 */
import empty from './'

describe('empty', () => {
  test('exports correctly', () => {
    ;[empty].map(fn => expect(typeof fn).toBe('object'))
  })
})
