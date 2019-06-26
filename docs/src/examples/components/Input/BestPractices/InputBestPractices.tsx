import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'For good screen reader experience set aria-label or aria-labelledby attribute for input.',
  },
  {
    key: 'two',
    content: 'If input is search, then use "role=`search`".',
  },
]

const InputBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default InputBestPractices
