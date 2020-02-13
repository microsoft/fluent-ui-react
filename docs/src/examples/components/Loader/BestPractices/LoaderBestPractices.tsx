import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  'Use react-aria-live or similar component to announce the loading state.',
  'If loader is only element which can receive focus, set `tabIndex` prop to the `Loader`. In most of cases value of `tabIndex` would be 0.',
]

const LoaderBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default LoaderBestPractices
