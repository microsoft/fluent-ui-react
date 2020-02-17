import * as React from 'react'
import { Text } from '@fluentui/react'
import { link } from '../../../../utils/helpers'
import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  <Text>
    Label each toolbar when the application contains more than one toolbar (using `aria-label` or
    `aria-labelledby` props). Refer to{' '}
    {link('toolbar(role)', 'https://www.w3.org/WAI/PF/aria/roles#toolbar')} for details.
  </Text>,
  'If `Toolbar` contains menu, then focus will need be handled after `onClick` is executed on `menuItem`.'
]

const ToolbarBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default ToolbarBestPractices
