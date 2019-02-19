import { danger, fail, markdown, warn } from 'danger'
import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

/* === CHANGELOG ==================================================================================================== */

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

let dependenciesChangedLogged = false

function logDependenciesChanged() {
  if (!dependenciesChangedLogged) {
    dependenciesChangedLogged = true
    warn('Package dependencies changed. Make sure you have OSS approval before merging!')
  }
}

danger.git.created_files
  .filter(filepath => filepath.match(/\bpackage\.json$/))
  .forEach(filepath => {
    warn(`New package added: ${filepath}. Make sure you have OSS approval before merging!`)
  })

danger.git.modified_files
  .filter(filepath => filepath.match(/\bpackage\.json$/))
  .forEach(async filepath => {
    const diff = await danger.git.JSONDiffForFile(filepath)
    if (diff.dependencies) {
      const before = { ...diff.dependencies.before, ..._.zipObject(diff.dependencies.added) }
      const after = diff.dependencies.after || {}
      const changedDependencies = _.reduce(
        before,
        (result, value, key) => {
          return value === after[key] || !after[key]
            ? result
            : { ...result, [key]: { before: value, after: after[key] } }
        },
        {},
      )
      if (!_.isEmpty(changedDependencies)) {
        const md = [
          `Changed dependencies in \`${filepath}\``,
          '',
          'package | before | after',
          '--- | --- | ---',
          ..._.map(
            changedDependencies,
            (value, key) => `${key} | ${value['before'] || '-'} | ${value['after']}`,
          ),
        ].join('\n')
        logDependenciesChanged()
        markdown(md)
      }
    }
  })
