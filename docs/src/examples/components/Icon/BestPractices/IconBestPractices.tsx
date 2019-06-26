import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const dontList = [
  {
    key: 'one',
    content:
      "Don't use as a replacement for actionable component - use `Button` text variant with an icon instead.",
  },
]

const FormBestPractices = () => {
  return <ComponentBestPractices dontList={dontList} />
}

export default FormBestPractices
