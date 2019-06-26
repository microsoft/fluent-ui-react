import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'Use Grid behavior for bidirectional keyboard navigation. Use appropriate ARIA role for the grid and actionable components inside of it.',
  },
]

const dontList = [
  {
    key: 'one',
    content: "Don't use grid component as a replacement for table",
  },
]

const GridBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default GridBestPractices
