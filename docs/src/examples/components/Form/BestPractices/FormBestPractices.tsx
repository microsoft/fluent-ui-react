import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'
import { link, code } from '../../../../utils/helpers'
import { Text } from '@fluentui/react'

const doList = [
  'Provide label by using `aria-label`, or `aria-labelledby` prop.',
  <Text>
    Do attach label to each input element - by using {code('Form.Field')} component or property on
    the input. See{' '}
    {link('label element documentation', 'https://www.w3schools.com/tags/tag_label.asp')} for
    details.
  </Text>,
]

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
