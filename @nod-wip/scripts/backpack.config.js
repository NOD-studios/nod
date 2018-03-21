/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const webpack = ({ plugins, entry, ...config }, options, webpack) => ({
  ...config,
  entry: {
    ...entry,
    index: './src/index.js',
    // lib: './src/lib.js',
  },
  plugins: [
    ...plugins,
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      include: './src/bin/*',
      entryOnly: true,
    }),
  ],
})

module.exports = { webpack }
