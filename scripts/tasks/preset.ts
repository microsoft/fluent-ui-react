import { startStorybookTask, buildStorybookTask, storybookConfigExists } from './storybookTask'
import {
  option,
  task,
  series,
  parallel,
  condition,
  apiExtractorUpdateTask,
  apiExtractorVerifyTask,
  webpackTask,
  tscTask,
  eslintTask,
  jestTask,
  cleanTask,
} from 'just-scripts'
import { publishPrepareTask } from './publishPrepareTask'
import { autoProjectRefsTask, autoProjectRefsVerifyTask } from './autoProjectRefsTask'
import { e2eTask, e2eWatchTask, e2ePerfTask } from './e2eTask'
import { httpServerTask } from './httpServerTask'
import path from 'path'

option('port', { alias: 'p' })
option('quiet', { alias: 'q' })
option('ci', { default: process.env.TF_BUILD || process.env.CI })

task('storybook:start', startStorybookTask())
task('storybook:build', buildStorybookTask())

task('webpack', webpackTask())
task('ts', tscTask({ build: 'tsconfig.json' }))
task('eslint', eslintTask())
task('jest', jestTask())
task('jest:snapshots', jestTask({ updateSnapshot: true }))
task('jest:watch', jestTask({ watch: true }))

task(
  'api-extractor:verify',
  apiExtractorVerifyTask({
    fixNewlines: true,
  }),
)

task(
  'api-extractor:update',
  apiExtractorUpdateTask({
    fixNewlines: true,
  }),
)

task(
  'clean',
  cleanTask({
    paths: ['lib', 'dist', 'tsconfig.tsbuildinfo'],
  }),
)

task('publish:prepare', publishPrepareTask)

task('build', parallel('ts', condition('storybook:build', storybookConfigExists)))
task('bundle', series('webpack'))
task('test', series('jest'))
task('test:watch', series('jest:watch'))

task(
  'e2e:server',
  httpServerTask({
    port: 3456,
    root: path.join(process.cwd(), 'dist'),
  }),
)

task('e2e', e2eTask)

task('e2e:perf', e2ePerfTask())

task(
  'e2e:watch',
  series(
    startStorybookTask({
      port: 3456,
    }),
    e2eWatchTask,
  ),
)

task('lint', series('eslint'))
task('start', series('storybook:start'))

task('projrefs', autoProjectRefsTask)
task('projrefs:verify', autoProjectRefsVerifyTask)
