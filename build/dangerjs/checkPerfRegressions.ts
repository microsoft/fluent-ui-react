import * as _ from 'lodash'
import * as fs from 'fs-extra'
import * as path from 'path'

import { DangerJS } from './types'
import config from '../config'

function linkToFlamegraph(value, filename) {
  // This as well as the whole flamegrill URL is hardcoded to only work with CircleCI.
  const build = process.env.CIRCLE_BUILD_NUM
  const GITHUB_REPO_ID = '141743704'

  if (_.isUndefined(build) || _.isUndefined(filename)) {
    return value
  }

  return `[${value}](https://${build}-${GITHUB_REPO_ID}-gh.circle-artifacts.com/0/artifacts/perf/${path.basename(
    filename,
  )})`
}

function fluentFabricComparision(danger, markdown, warn) {
  let perfCounts
  try {
    perfCounts = require(config.paths.packageDist('perf-test', 'perfCounts.json'))
  } catch {
    warn('No perf measurements available')
    return
  }
  const results = _.mapValues(
    _.pickBy(perfCounts, (value, key) => key.endsWith('.Fluent')),
    stats => {
      const fluentTpi = _.get(stats, 'extended.tpi')
      const fabricTpi = _.get(stats, 'extended.fabricTpi')
      return {
        numTicks: stats.analysis.numTicks,
        iterations: stats.extended.iterations,
        fluentTpi,
        fabricTpi,
        fluentToFabric: Math.round((fluentTpi / fabricTpi) * 100) / 100,
        fluentFlamegraphFile: _.get(stats, 'processed.output.flamegraphFile'),
      }
    },
  )

  fs.mkdirpSync(config.paths.ciArtifacts('perf'))

  _.forEach(results, value => {
    fs.copyFileSync(
      value.fluentFlamegraphFile,
      config.paths.ciArtifacts('perf', path.basename(value.fluentFlamegraphFile)),
    )
  })

  const getStatus = fluentToFabric =>
    fluentToFabric > 1 ? '🔧' : fluentToFabric >= 0.7 ? '🎯' : '🦄'

  markdown(
    [
      '## Perf comparison',
      '',
      'Status | Scenario | Fluent TPI | Fabric TPI | Ratio | Iterations | Ticks',
      ':---: | :--- | ---:| ---:| ---:| ---:| ---:',
      ..._.map(results, (value, key) =>
        [
          getStatus(value.fluentToFabric),
          key,
          linkToFlamegraph(value.fluentTpi, value.fluentFlamegraphFile),
          value.fabricTpi,
          `${value.fluentToFabric}:1`,
          value.iterations,
          value.numTicks,
        ].join(' | '),
      ),
      '>🔧 Needs work &nbsp; &nbsp; 🎯 On target &nbsp; &nbsp; 🦄 Amazing',
    ].join('\n'),
  )
}

export default ({ danger, markdown, warn }: DangerJS) => {
  fluentFabricComparision(danger, markdown, warn)
}
