import cp from 'child_process'
import path from 'path'
import { task } from 'gulp'

const DOCS_ROOT = path.resolve(__dirname, '../../../docs-v2')

task('build:docs', cb => {
  cp.execSync('yarn build', { cwd: DOCS_ROOT })
  cb()
})

// TODO: wait for docs to be running before invoking cb
task('serve:docs', cb => {
  cp.spawn('yarn', ['start'], { cwd: DOCS_ROOT, stdio: 'inherit' })
  cb()
})
