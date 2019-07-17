import { danger, markdown, warn } from 'danger'

import * as _ from 'lodash'

const detectChangedDependencies = async () => {
  danger.git.created_files
    .filter(filepath => filepath.match(/\bpackage\.json$/))
    .forEach(filepath => {
      warn(`New package.json added: ${filepath}. Make sure you have approval before merging!`)
    })

  const dependenciesChanged = await checkDependencyChanges(danger.git.modified_files)
  if (dependenciesChanged) {
    warn('Package (or peer) dependencies changed. Make sure you have approval before merging!')
  }
}

const checkDependencyChanges = async modifiedFiles => {
  return modifiedFiles
    .filter(filepath => filepath.match(/\bpackage\.json$/))
    .reduce(async (hasWarning, filepath) => {
      const changedDependencies = await getChangedDependencies(filepath)
      const changedPeerDependencies = await getChangedDependencies(filepath, 'peerDependencies')

      let shouldLogWarning = hasWarning
      if (!_.isEmpty(changedDependencies)) {
        markdownChangedDependencies(filepath, changedDependencies)
        shouldLogWarning = true
      }
      if (!_.isEmpty(changedPeerDependencies)) {
        markdownChangedDependencies(filepath, changedPeerDependencies, 'peerDependencies')
        shouldLogWarning = true
      }
      return shouldLogWarning
    }, false)
}

const getChangedDependencies = async (filepath, dependenciesKey = 'dependencies') => {
  const diff = await danger.git.JSONDiffForFile(filepath)
  if (!diff[dependenciesKey]) {
    return {}
  }

  const before = { ...diff[dependenciesKey].before, ..._.zipObject(diff[dependenciesKey].added) }
  const after = diff[dependenciesKey].after || {}
  return _.reduce(
    before,
    (result, value, key) => {
      return value === after[key] || !after[key]
        ? result
        : { ...result, [key]: { before: value, after: after[key] } }
    },
    {},
  )
}

const markdownChangedDependencies = (
  filepath,
  changedDependencies,
  dependenciesKey = 'dependencies',
) => {
  markdown(
    [
      `Changed ${dependenciesKey} in \`${filepath}\``,
      '',
      'package | before | after',
      '--- | --- | ---',
      ..._.map(
        changedDependencies,
        (value, key) => `${key} | ${value['before'] || '-'} | ${value['after']}`,
      ),
    ].join('\n'),
  )
}

export default detectChangedDependencies
