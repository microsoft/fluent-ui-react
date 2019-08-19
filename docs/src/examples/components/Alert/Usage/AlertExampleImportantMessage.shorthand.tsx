import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleImportantMessage = () => (
  <Alert
    warning
    icon="exclamation-triangle"
    header="Your password may have been compromised"
    content="Please change your password"
  />
)

export default AlertExampleImportantMessage
