import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Use popupFocusTrapBehavior if the focus needs to be trapped inside of the Popup.',
  },
  {
    key: 'two',
    content:
      "If Popup's content is lazy loaded and focus needs to be trapped inside - make sure to use state change to trigger componentDidUpdate, so the focus can be set correctly to the first tabbable element inside Popup or manually set focus to the element inside once content is loaded.",
  },
]

const AlertBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default AlertBestPractices
