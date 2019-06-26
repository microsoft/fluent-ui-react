import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Use popupFocusTrapBehavior if the focus needs to be trapped inside of the Popup.',
  },
]

const AlertBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default AlertBestPractices
