/*
  eslint
  fp/no-mutation:0,
  import/no-commonjs:0,
  fp/no-let:0
*/

const { tap } = require('ramda')
const { join } = require('path')
const { statSync } = require('fs')
const DotenvPlugin = require('webpack-dotenv-plugin')

let dotEnvExists = false

try {
  dotEnvExists = statSync('.env') ? true : false
} catch (error) {
  dotEnvExists = false
}

const path = join(__dirname, '.env')

const dotEnv = dotEnvExists ? [new DotenvPlugin({ path })] : []

module.exports = {
  modify: (
    { plugins, output, target: targetConfig, node, entry, ...config },
    { target, dev },
    webpack,
  ) => {
    return {
      ...config,
      node:
        target === 'web'
          ? {
              console: false,
              fs: 'empty',
              net: 'empty',
              tls: 'empty',
            }
          : node,
      entry,
      plugins: [...plugins, ...dotEnv],
      output,
    }
  },
}
