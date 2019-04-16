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
    content="This is an urgent alert"
  />
)

export default AlertExampleInfo
