import * as React from 'react'
import ComponentBestPractices from '../../../../components/ComponentBestPractices'
import { link, code } from '../../../../utils/helpers'
import { Text } from '@fluentui/react'

const doList = [
  <Text>
    Do use {link('trapFocus', '/focus-trap-zone#usage')} prop to control focus trapping behavior.
  </Text>,
  <Text>
    Do use {code('aria-describedby')} prop to override or omit description if the dialog content is
    complex (contains actionable elements). Refer to{' '}
    {link('ARIA Modal Dialog pattern', 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal')}{' '}
    for details.
  </Text>,
]

const DialogBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DialogBestPractices
