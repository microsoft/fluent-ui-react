import * as React from 'react'
import { PresenceIndicator } from '@stardust-ui/react'

const PresenceIndicatorShorthandExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <PresenceIndicator status="Available" title="Available" />
    <PresenceIndicator status="Busy" title="In a call" />
    <PresenceIndicator status="DoNotDisturb" title="Do not disturb" />
    <PresenceIndicator status="Away" title="Away" />
    <PresenceIndicator status="BeRightBack" title="Be right back" />
    <PresenceIndicator status="Offline" title="Offline" />
    <PresenceIndicator status="PresenceUnknown" title="Presence unknown" />
  </div>
)

export default PresenceIndicatorShorthandExample
