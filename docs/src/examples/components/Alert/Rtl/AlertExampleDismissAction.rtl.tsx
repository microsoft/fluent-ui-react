import * as React from 'react'
import { Alert } from '@stardust-ui/react'

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
    content="مرحبا العالم"
  />
)

export default AlertExampleDismissActionRtl
