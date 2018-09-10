import * as React from 'react'
import { StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorExampleShorthand = () => (
  <div>
    <StatusIndicator />
    &emsp;
    <StatusIndicator status="success" />
    &emsp;
    <StatusIndicator status="info" />
    &emsp;
    <StatusIndicator status="warning" />
    &emsp;
    <StatusIndicator status="error" />
    &emsp;
    <StatusIndicator status="unknown" />
  </div>
)

export default StatusIndicatorExampleShorthand
