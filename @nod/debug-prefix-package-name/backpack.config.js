/* eslint fp/no-mutation:0,import/no-commonjs:0 */

module.exports = {
  webpack: config => ({
    ...config,
    entry: {
      'index': './src/index.js',
      'lib': './src/lib.js',
    },
  })
}
