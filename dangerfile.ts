import { danger, fail, markdown, warn } from 'danger'
import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

const CHANGELOG_FILE = 'CHANGELOG.md'

/**
 * This function asserts that added entries into the changelog file are placed in the right section.
 */
const hasAddedLinesAfterVersionInChangelog = async (): Promise<boolean> => {
  const changelogContent = fs.readFileSync(path.resolve(__dirname, CHANGELOG_FILE)).toString()
  const versionLineNumber = changelogContent
    .split('\n')
    .findIndex(line => line.startsWith('<!--') && line.endsWith('-->'))

  const changelogDiff = await danger.git.structuredDiffForFile(CHANGELOG_FILE)
  const addedLines = changelogDiff.chunks.reduce((acc, chunk) => {
    const filteredLines = chunk.changes.filter(change => change.type === 'add')

    return acc.concat(filteredLines)
  }, [])

  return addedLines.some(line => line.ln >= versionLineNumber)
}

async function getChangedDependencies(filepath, dependenciesKey = 'dependencies') {
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

function markdownChangedDependencies(
  filepath,
  changedDependencies,
  dependenciesKey = 'dependencies',
) {
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

async function checkDependencyChanges(modifiedFiles) {
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

export default async () => {
  /* === CHANGELOG ==================================================================================================== */

  // Check for a CHANGELOG entry
  const hasChangelog = danger.git.modified_files.some(f => f === CHANGELOG_FILE)

  if (!hasChangelog) {
    warn(
      'There are no updates provided to CHANGELOG. Ensure there are no publicly visible changes introduced by this PR.',
    )
  } else {
    hasAddedLinesAfterVersionInChangelog().then(hasLine => {
      if (hasLine) {
        fail(`All of your entries in ${CHANGELOG_FILE} should be in the **Unreleased** section!`)
      }
    })
  }

  /* === Package dependencies ========================================================================================= */

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
