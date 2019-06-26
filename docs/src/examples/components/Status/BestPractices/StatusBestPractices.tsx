import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'The `img` role is used to identify an element as image. `Title` attribute have to be provided on status component. Then reader narrate content of `title` attribute.',
  },
]

const StatusBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default StatusBestPractices
