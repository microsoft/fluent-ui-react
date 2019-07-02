import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  'Add textual representation if the component only contains an icon (using `title`, `aria-label` or `aria-labelledby` props).',
]

const ButtonBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default ButtonBestPractices
