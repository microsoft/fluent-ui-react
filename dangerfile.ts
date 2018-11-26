import { danger, warn } from 'danger'

// Check for a CHANGELOG entry
const hasChangelog = danger.git.modified_files.some(f => f === 'CHANGELOG.md')

if (!hasChangelog) {
  warn(
    'There are no updates provided to CHANGELOG. Ensure there are no publicly visible changes introduced by this PR.',
  )
}
