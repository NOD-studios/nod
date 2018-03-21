// import gulp from 'gulp'
import { pipe, tap } from 'ramda'
import { tasks } from './src/lib'
import npmListLinked from 'npm-list-linked'

// console.log({ npmListLinked })

export default pipe(gulp =>
  tap(
    gulp =>
      Object.entries(tasks).map(([taskName, taskFn]) =>
        gulp.task(taskName, taskFn),
      ),
    gulp,
  ),
)(gulp)
