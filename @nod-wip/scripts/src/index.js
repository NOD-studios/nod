// @flow
/* eslint fp/no-unused-expression:0 */
import { thrower, debug, reducer } from '@chantelle/util'
import spawn from 'react-dev-utils/crossSpawn'
import { Map, List } from 'immutable'
import type {
  Map as typeMap,
  Set as typeSet,
  Seq as typeSeq,
  List as typeList,
  Stack as typeStack,
  Record as typeRecord,
  OrderedMap as typeOrderedMap,
  OrderedSet as typeOrderedSet,
} from 'immutable'
import {
  pipe,
  over,
  view,
  set,
  lens as lensRamda,
  lensIndex,
  __,
  either,
  merge,
  when,
  equals,
  tap,
  map,
  and,
  any,
  not,
  prop,
  curry,
  compose,
  reverse,
} from 'ramda'

import type ramda from 'ramda'

type typePrimitive = string | boolean | number
type typeCollection =
  | typeMap<*>
  | typeSet<*>
  | typeSeq<*>
  | typeList<*>
  | typeStack<*>
  | typeRecord
  | typeOrderedMap<*>
  | typeOrderedSet<*>

type typeKey = string
type typeValue = typePrimitive | typeCollection

const log = description =>
  tap(value => console.info(value, description.concat(' %O')))

// const lens = (key: typeKey) =>
//   lensRamda(x => x.get(key), (val, x) => x.set(key, val))

// const get = (key: typeKey, defaultValue?: typeValue): Function => (
//   collection: typeCollection,
// ): typeValue => get(collection, key, defaultValue)
//
// const set = (key: typeKey): Function => (
//   collection: typeCollection,
// ): Function => (value: typeValue): typeCollection => set(collection, key, value)

export const [
  script,
  command,
  message,
  args,
  scriptsPath,
  scriptIndex,
  errorTexts,
  scriptRunner,
  scriptRunners,
  nodeArgs,
  signal,
] = [
  'script',
  'command',
  'message',
  'args',
  'scriptsPath',
  'scriptIndex',
  'errorTexts',
  'scriptRunner',
  'scriptRunners',
  'nodeArgs',
  'signal',
].map(lens)

export const getScriptsPath = pipe(
  log('getScriptsPath'),
  over(scriptsPath, either(() => process.env.SCRIPTS_PATH, () => '../'))
)

const loadScriptFile = state =>
  require.resolve(getScriptsPath(state).concat(lens(view)(state)))

const runReactScripts = set(command, `react-scripts ${script}`)

const runBackpack = set(command, `backpack ${script}`)

const runRazzle = set(command, `razzle ${script}`)

const build = runBackpack

const test = pipe(runRazzle, command => command.concat(' --env=jsdom'))

export const defaultState = Map({
  message: '',
  errorTexts: List(),
  scriptRunners: Map({ build, test }),
})

// pipe(map(({ toJs }) => toJs()), tap(console.info)),

// const lens = key => lensRamda(x => x.get(key), (val, x) => x.set(key, val))

export const getArgs = set(args)(process.argv.slice(2))

export const getScriptIndex = over(scriptIndex, view(args).findIndex)

export const getScript = over(
  script,
  equals(view(scriptIndex), -1)
    ? pipe(args, lensIndex(0))
    : pipe(args, lensIndex(scriptIndex))
)

export const getNodeArgs = over(
  nodeArgs,
  state =>
    view(scriptIndex)(state) > 0 ? view(args)(state).slice(0, scriptIndex) : []
)

export const getScriptRunner = pipe(
  set(scriptRunner),
  view(pipe(scriptRunners, lens(script)))
)

export const spawnSync = pipe(
  over(nodeArgs, state =>
    nodeArgs
      .concat(runScript())
      .concat(view(args)(state).slice(scriptIndex + 1))
  ),
  merge,
  state => spawn.sync('node', view(nodeArgs, state), { stdio: 'inherit' })
)

export const shutdownProcess = process.exit

export const shutdownProcessWithError = () => process.exit(1)

export const getSigtermMessage = over(message, message =>
  message
    .concat('The build failed because the process exited too ')
    .concat('early. Someone might have called `kill` or ')
    .concat('`killall`, or the system could  be shutting down.')
)

export const getSigkillMessage = over(message, message =>
  message
    .concat('The build failed because the process exited too ')
    .concat('early. This probably means the system ran out of ')
    .concat('memory or someone called `kill -9` on the process.')
)

export const scriptIsValid = script => (state: typeCollection): boolean =>
  pipe(view(scriptRunners), Object.keys, keys => keys.includes(script))

export const scriptIsNotValid = compose(not, scriptIsValid, debug)

export const scriptNotFound = over(errorTexts, errorTexts =>
  errorTexts.concat([
    `Unknown script "${script}".`,
    'Perhaps you need to update react-scripts?',
  ])
)

export const logErrorTexts = tap(pipe(view(errorTexts), map(console.error)))

export const throwErrorTexts = tap(state =>
  compose(thrower, Error, view(errorTexts, state).join(' '))
)

export const runScript = pipe(
  getNodeArgs,
  spawnSync,
  either(
    when(equals(view(signal), 'SIGKILL'), getSigkillMessage),
    when(equals(view(signal), 'SIGTERM'), getSigtermMessage)
  ),
  getScriptRunner,
  prop('getScriptRunner')
)

export const checkAndRunScript = pipe(
  getScriptsPath,
  when(scriptIsValid, runScript),
  when(scriptIsNotValid, scriptNotFound),
  throwErrorTexts
)

export const runScriptNameWithArgs = pipe(
  log('runScriptNameWithArgs'),
  getArgs,
  getScriptIndex,
  runScript,
  getNodeArgs
)

export const run = pipe(runScriptNameWithArgs, checkAndRunScript)

export default (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV === 'CI'
  ? run
  : run(defaultState))

// export default pipe(
//   either(when(['build', 'test', 'eject', 'start'].includes(script))
//   ({ scriptIncludes }) => ({
//     texts: tap(texts => texts.map(console.info), [
//       `Unknown script "${script}".`,
//       'Perhaps you need to update react-scripts?',
//     ]),
//   }),
//   ({ signal, ...state }) => when(signal => equals(signal, 'SIGKILL'), pipe()),
//   signal => equals(signal, 'SIGKILL'),
//   (message = '') =>
//     message
//       .concat('The build failed because the process exited too ')
//       .concat('early. This probably means the system ran out of ')
//       .concat('memory or someone called `kill -9` on the process.'),
//   ({ signalMessage, ...state }) => (
//     console.info,
//     {
//       ...state,
//       signalMessage,
//     }
//   ),
// )({ script, result, nodeArgs })

// tap(texts => texts.map(console.info), [
//       `Unknown script "${script}".`,
//       'Perhaps you need to update react-scripts?',
//     ]))

// export const tasks = {
//   start: gulp =>
//     gulp
//       .src(['./node_modules/*.js'])
//       .pipe(shell([`yarn link ${folder}`]))
//       .on('error', log),
// }

// import { join } from 'path'
// import gulpLoadPlugins from 'gulp-load-plugins'
// import { paths } from '@chantelle/config'
//
// export const tasks = gulp => {
//   const { config, util, vendor, appDirectory } = paths
//   const { shell, eslint, lebab, print, util: { log } } = gulpLoadPlugins()
//
//   const linkFolder = folder =>
//     gulp
//       .src(appDirectory)
//       .pipe(shell([`yarn link ${folder}`]))
//       .on('error', log)
//
//   gulp.task('link-config', () => linkFolder(config))
//
//   gulp.task('link-util', () => linkFolder(util))
//
//   gulp.task('link-vendor', () => linkFolder(vendor))
//
//   gulp.task(
//     'link-legacy',
//     gulp.parallel('link-util', 'link-config', 'link-vendor'),
//   )
//
//   gulp.task('postinstall-legacy', gulp.parallel('link-legacy'))
//
//   const pathJs = './'
//   const patternJs = join('**/*.js')
//   const patternJsSrc = [join(pathJs, patternJs), '!./node_modules/**/*.js']
//   const patternJsDest = join(pathJs)
//
//   gulp.task('lint', () =>
//     gulp
//       .src(patternJsSrc)
//       .pipe(print())
//       .pipe(eslint())
//       .on('error', log),
//   )
//
//   gulp.task('lint-fix', () =>
//     gulp
//       .src(patternJsSrc)
//       .pipe(print())
//       .pipe(eslint({ fix: true }))
//       .pipe(gulp.dest(patternJsDest))
//       .on('error', log),
//   )
//
//   gulp.task('lebab', () =>
//     gulp
//       .src(patternJsSrc)
//       .pipe(print())
//       .pipe(lebab())
//       .pipe(gulp.dest(patternJsDest))
//       .on('error', log),
//   )
//
//   gulp.task('fix-syntax', gulp.parallel('lebab', 'lint-fix'))
//
//   gulp.task('precommit', gulp.parallel('fix-syntax'))
//
//   gulp.task(
//     'build-translations',
//     shell.task('babel-node ./scripts/translations'),
//   )
//
//   gulp.task('start-dev-server', shell.task('babel-node ./scripts/start'))
//
//   gulp.task('start-build-script', shell.task('babel-node ./scripts/build'))
//
//   gulp.task(
//     'start-legacy',
//     gulp.series('link-legacy', 'build-translations', 'start-dev-server'),
//   )
//
//   gulp.task(
//     'build-legacy',
//     gulp.series('link-legacy', 'build-translations', 'start-build-script'),
//   )
//
//   gulp.task('build', gulp.series('start-build-script'))
//
//   // gulp.task('default', gulp.series('start'))
//
//   return gulp
// }
