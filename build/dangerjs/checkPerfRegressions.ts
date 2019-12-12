import config from '../../config'
import { DangerJS } from './types'

export default ({ danger, fail, warn }: DangerJS) => {
  const perfCounts = require(config.paths.packageDist('perf-test', 'perfCounts.json'))
  console.log('perfCounts', perfCounts)
}
