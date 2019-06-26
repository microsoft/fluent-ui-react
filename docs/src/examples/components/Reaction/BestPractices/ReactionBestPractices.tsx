import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'Use actionable components (for example Button) if the reactions need to be actionable.',
  },
  {
    key: 'two',
    content:
      'Add textual representation to the icon slot if it only contains an icon (using title, aria-label or aria-labelledby props on the slot).',
  },
]

const ReactionBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default ReactionBestPractices
