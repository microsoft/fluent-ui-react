import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Provide label by using `aria-label`, or `aria-labelledby` prop.',
  },
]

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
