import * as React from 'react'
import { Alert } from '@fluentui/react'

const AlertExampleDismissActionRtl = () => (
  <Alert
    actions={[
      {
        content: 'مرحبا',
        primary: true,
      },
      {
        content: 'عالم',
      },
    ]}
    icon={{ name: 'exclamation-triangle' }}
    content="مرحبا العالم"
  />
)

export default AlertExampleDismissActionRtl
