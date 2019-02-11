import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon="check" alt="available" />
    &emsp;
    <Status state="error" icon="minus" alt="busy" />
  </div>
)

export default StatusIconExampleShorthand
