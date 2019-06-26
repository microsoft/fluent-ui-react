import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content: 'Use Accordion for grouping parts of the UI (multipart forms, articales...).',
  },
  {
    key: 'two',
    content:
      'Use Tree component to display a hierarchical structure that allows user to select one item.',
  },
]

const AccordionBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default AccordionBestPractices
