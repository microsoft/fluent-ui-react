import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleOof = () => (
  <Alert
    variables={{ oof: true }}
    action={{
      icon: 'close',
    }}
  >
    This is an oof alert
  </Alert>
)

export default AlertExampleOof
