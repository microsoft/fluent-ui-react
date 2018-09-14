import { task } from 'gulp'
import prepush from './prepush'

task('git:prepush', cb => {
  const errorMessage = prepush()
  cb(errorMessage)
})
