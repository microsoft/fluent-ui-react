import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link, code } from '../../../../utils/helpers'
import { Text } from '@stardust-ui/react'

const doList = [
  'Provide label by using `aria-label`, or `aria-labelledby` prop.',
  <Text>
    Do attach label to each input element. By using {code('Form.Field')} component or by using for
    property on the input. Seee{' '}
    {link('element documentation', 'https://www.w3schools.com/tags/tag_label.asp')} for details.
  </Text>,
]

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
