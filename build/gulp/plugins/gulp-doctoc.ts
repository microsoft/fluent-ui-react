import * as through2 from 'through2'
import sh from '../sh'

export default () =>
  through2.obj((file, enc, done) => {
    sh(`doctoc ${file.path} --github --maxlevel 4`)
      .then(() => sh(`git add ${file.path}`))
      .then(() => {
        done(null, file)
      })
      .catch(done)
  })
