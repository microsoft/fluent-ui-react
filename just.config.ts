import { task } from 'just-scripts'
import { publishPrepareTask } from './scripts/tasks/publishPrepareTask'

task('publish:prepare', publishPrepareTask)
