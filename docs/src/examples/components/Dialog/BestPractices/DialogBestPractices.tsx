import * as React from 'react'
import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'
import { link, code } from '../../../../utils/helpers'
import { Text } from '@stardust-ui/react'

const doList = [
  'Do use `trapFocus` prop to control focus trapping behavior.',
  <Text>
    Do use {code('aria-describedby')} prop to override or omit description if the dialog content is
    complex (contains actionable elements). Refer to{' '}
    {link(
      'aria pattern',
      'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html',
    )}
  </Text>,
]

const DialogBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DialogBestPractices
