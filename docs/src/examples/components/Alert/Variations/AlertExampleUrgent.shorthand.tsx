import * as React from 'react'
import { Alert } from '@stardust-ui/react'

const AlertExampleUrgent = () => (
  <Alert content="This is an urgent alert" dismissible variables={{ urgent: true }} />
)

export default AlertExampleUrgent
