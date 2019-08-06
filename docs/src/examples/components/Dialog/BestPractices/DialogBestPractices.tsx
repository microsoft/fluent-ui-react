import * as React from 'react'
import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link } from '../../../../utils/helpers'
import { Text } from '@stardust-ui/react'

const doList = [
  'Do use `trapFocus` prop to control focus trapping behavior.',
  <Text>
    Recommended{' '}
    {link(
      'aria pattern',
      'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html',
    )}{' '}
    how to label dialog is following:
    <ul>
      <li> aria-labelledby="id of the dialog title" </li>
      <li> aria-describedby="id of the dialog content" </li>
    </ul>
    This approach is automatically applied by stardust behavior. In case your dialog content is
    huge, then consider overriding aria-describedby to shorted description, or don't use the
    attribute.
  </Text>,
]

const DialogBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DialogBestPractices
