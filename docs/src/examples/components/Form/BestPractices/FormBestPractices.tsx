import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link } from '../../../../utils/helpers'
import { Text } from '@stardust-ui/react'

const doList = [
  'Provide label by using `aria-label`, or `aria-labelledby` prop.',
  <Text>
    Recommended {link('pattern', 'https://www.w3schools.com/tags/tag_label.asp')} how to label input
    in the form is following:
    <ul>
      <li> label tag has attribute for="id of input" </li>
      <li> input has "id" attribute </li>
    </ul>
    This approach is automatically applied by stardust behavior. In case stardust form component is
    not used, then follow the labelling of input in form as described above.
  </Text>,
]

const DropdownBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
