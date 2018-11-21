import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon="check" />
    &emsp;
    <Status state="error" icon="minus" />
  </div>
)

export default StatusIconExampleShorthand
