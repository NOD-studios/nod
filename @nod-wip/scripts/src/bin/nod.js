//@flow
/* eslint fp/no-unused-expression:0, better/no-ifs:0 */

import spawn from 'react-dev-utils/crossSpawn'

const args = process.argv.slice(2)

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test',
)
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

/*
#!/usr/bin/env node
'use strict';
var cli = require('../lib/cli');
var nodemon = require('../lib/');
var options = cli.parse(process.argv);

nodemon(options);

var fs = require('fs');

// checks for available update and returns an instance
var pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));

if (pkg.version.indexOf('0.0.0') !== 0) {
  require('update-notifier')({ pkg }).notify();
}
 */

switch (script) {
  // case 'eject':
  // case 'start':
  // case 'test':
  case 'build': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve(`../${script}`))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' },
    )
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.',
        )
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.',
        )
      }
      process.exit(1)
    }
    process.exit(result.status)
    break
  }
  default:
    console.warn(`Unknown script "${script}".`)
    console.warn('Perhaps you need to update @nod/scripts?')
    break
}
