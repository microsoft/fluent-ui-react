import * as React from 'react'
import { StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorShorthandExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <StatusIndicator status="Available" title="Available" />
    <StatusIndicator status="Busy" title="In a call" />
    <StatusIndicator status="DoNotDisturb" title="Do not disturb" />
    <StatusIndicator status="Away" title="Away" />
    <StatusIndicator status="BeRightBack" title="Be right back" />
    <StatusIndicator status="Offline" title="Offline" />
    <StatusIndicator status="PresenceUnknown" title="Presence unknown" />
  </div>
)

export default StatusIndicatorShorthandExample
