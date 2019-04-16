import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleInfo = () => (
  <Alert
    oof
    action={{
      icon: {
        name: 'close',
        outline: true,
      },
      onClick: () =>
        this.setState({
          open: false,
        }),
    }}
  >
    This is an oof alert
  </Alert>
)

export default AlertExampleInfo
