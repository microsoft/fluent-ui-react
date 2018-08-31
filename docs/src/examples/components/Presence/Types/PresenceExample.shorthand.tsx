import * as React from 'react'
import { Presence } from '@stardust-ui/react'

const PresenceShorthandExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <Presence status="Available" title="Available" />
    <Presence status="Busy" title="In a call" />
    <Presence status="DoNotDisturb" title="Do not disturb" />
    <Presence status="Away" title="Away" />
    <Presence status="BeRightBack" title="Be right back" />
    <Presence status="Offline" title="Offline" />
    <Presence status="PresenceUnknown" title="Presence unknown" />
  </div>
)

export default PresenceShorthandExample
