import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleUrgent = () => (
  <Alert
    variables={{ urgent: true }}
    action={{
      icon: 'close',
    }}
  >
    This is an urgent alert
  </Alert>
)

export default AlertExampleUrgent
