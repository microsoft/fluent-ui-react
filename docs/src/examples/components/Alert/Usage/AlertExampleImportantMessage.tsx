import * as React from 'react'
import { Alert } from '@fluentui/react'

const AlertExampleImportantMessage = () => (
  <Alert
    warning
    icon={{ name: 'exclamation-triangle' }}
    header="Your password may have been compromised"
    content="Please change your password"
    dismissible
  />
)

export default AlertExampleImportantMessage
