/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const webpack = ({ plugins, ...config }, options, webpack) => ({
  ...config,
  entry: {
    index: './src/index.js',
    lib: './src/lib.js',
  },
  plugins: [
    ...plugins,
    webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      include: './src/bin/*',
      entryOnly: true,
    }),
  ],
})

module.exports = { webpack }
