import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Use warning and danger variants to announce the alert by the screen reader.',
  },
  {
    key: 'two',
    content:
      'Use other libraries (for example react-aria-live) if the content of default or success variant needs to be announced.',
  },
  {
    key: 'three',
    content:
      'Add textual representation to action slot if they only contain an icon (using title, aria-label or aria-labelledby props on the slot).',
  },
]

const PopupBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default PopupBestPractices
