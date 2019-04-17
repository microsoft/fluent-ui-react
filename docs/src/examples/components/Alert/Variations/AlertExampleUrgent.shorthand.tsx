import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleUrgent = () => (
  <Alert
    variables={{ urgent: true }}
    action={{
      icon: 'close',
      onClick: () =>
        this.setState({
          open: false,
        }),
    }}
    content="This is an urgent alert"
  />
)

export default AlertExampleUrgent
