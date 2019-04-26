import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleOof = () => (
  <Alert
    variables={{ oof: true }}
    action={{
      icon: 'close',
    }}
    content="This is an oof alert"
  />
)

export default AlertExampleOof
