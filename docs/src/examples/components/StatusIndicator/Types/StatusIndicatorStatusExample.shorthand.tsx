import * as React from 'react'
import { StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorStatusExampleShorthand = () => (
  <div>
    <StatusIndicator status="success" /> <code>status="success"</code>
    <br />
    <StatusIndicator status="info" /> <code>status="info"</code>
    <br />
    <StatusIndicator status="warning" /> <code>status="warning"</code>
    <br />
    <StatusIndicator status="error" /> <code>status="error"</code>
    <br />
    <StatusIndicator status="unknown" /> <code>status="unknown"</code>
  </div>
)

export default StatusIndicatorStatusExampleShorthand
