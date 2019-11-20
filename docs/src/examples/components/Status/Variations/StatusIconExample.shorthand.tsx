import * as React from 'react'
import { Status } from '@fluentui/react'

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon="stardust-checkmark" title="available" />
    &emsp;
    <Status state="error" icon="ban" title="offline" />
  </div>
)

export default StatusIconExampleShorthand
