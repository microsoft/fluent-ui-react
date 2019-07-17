import { danger, fail, warn } from 'danger'
import * as fs from 'fs'
import * as path from 'path'

const CHANGELOG_FILE = 'CHANGELOG.md'

const checkChangelog = async () => {
  // Check for a CHANGELOG entry
  const hasChangelog = danger.git.modified_files.some(f => f === CHANGELOG_FILE)

  if (!hasChangelog) {
    warn(
      'There are no updates provided to CHANGELOG. Ensure there are no publicly visible changes introduced by this PR.',
    )
  } else {
    const malformedChangelogEntries = await getMalformedChangelogEntries()
    malformedChangelogEntries.forEach(entry => {
      fail(`Invalid entry format in ${CHANGELOG_FILE}: >${entry}<`)
    })

    const hasLine = await hasAddedLinesAfterVersionInChangelog()
    if (hasLine) {
      fail(`All of your entries in ${CHANGELOG_FILE} should be in the **Unreleased** section!`)
    }
  }
}

/**
 * This function asserts that added entries into the changelog file are placed in the right section.
 */
const hasAddedLinesAfterVersionInChangelog = async (): Promise<boolean> => {
  const changelogContent = fs.readFileSync(path.resolve(__dirname, CHANGELOG_FILE)).toString()
  const versionLineNumber = changelogContent
    .split('\n')
    .findIndex(line => line.startsWith('<!--') && line.endsWith('-->'))

  const addedLines = await getAddedLinesFromChangelog()

  return addedLines.some(line => line.ln > versionLineNumber)
}

const getMalformedChangelogEntries = async (): Promise<string[]> => {
  // +- description @githubname ([#DDDD](https://github.com/stardust-ui/react/pull/DDDD))
  const validEntry = /^\+- .*@\S+ \(\[#\d+]\(https:\/\/github\.com\/stardust-ui\/react\/pull\/\d+\)\)$/

  const addedLines = await getAddedLinesFromChangelog()

  return addedLines
    .map(line => line.content)
    .filter(content => content.startsWith('+-') && !validEntry.test(content))
}

const getAddedLinesFromChangelog = async (): Promise<{ content: string; ln: number }[]> => {
  return danger.git.structuredDiffForFile(CHANGELOG_FILE).then(changelogDiff => {
    return changelogDiff.chunks.reduce((acc, chunk) => {
      const filteredLines = chunk.changes.filter(change => change.type === 'add')
      return acc.concat(filteredLines)
    }, [])
  })
}

export default checkChangelog
