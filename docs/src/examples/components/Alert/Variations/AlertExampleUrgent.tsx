import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleInfo = () => (
  <Alert
    urgent
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
    This is an urgent alert
  </Alert>
)

export default AlertExampleInfo
