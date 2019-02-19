import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon="check" title="available" />
    &emsp;
    <Status state="error" icon="minus" title="busy" />
  </div>
)

export default StatusIconExampleShorthand
