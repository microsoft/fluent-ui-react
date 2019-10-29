import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusCustomExampleShorthand = () => (
  <div>
    <Status styles={{ background: 'orange' }} icon="call-pstn" title="In call" />
    &emsp;
    <Status styles={{ background: 'blue' }} icon="onedrive" title="Working from the sky" />
    &emsp;
    <Status styles={{ background: 'red' }} icon="ban" title="Offline" />
  </div>
)

export default StatusCustomExampleShorthand
