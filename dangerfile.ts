import { danger, fail, warn } from 'danger'
import * as fs from 'fs'
import * as path from 'path'

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
