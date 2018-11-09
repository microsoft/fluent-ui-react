import { danger, warn } from 'danger'

// Check for a CHANGELOG entry
const hasChangelog = danger.git.modified_files.some(f => f === 'CHANGELOG.md')

if (!hasChangelog) {
  warn('Please add a changelog entry for your changes.')
}
