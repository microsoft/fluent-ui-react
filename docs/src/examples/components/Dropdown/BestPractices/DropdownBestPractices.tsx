import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'Provide getA11ySelectionMessage, getA11yStatusMessage, noResultsMessage and loadingMessage props to announce state changes correctly.',
  },
  {
    key: 'two',
    content:
      'Provide aria-label to triggerButton slot for non-searchable variants if the placeholder prop is not used.',
  },
]

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
