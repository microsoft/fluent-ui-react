import * as React from 'react'
import { Status } from '@fluentui/react'

const StatusIconExampleShorthand = () => (
  <div>
    <Status state="success" icon={{ name: 'icon-checkmark' }} title="available" />
    &emsp;
    <Status state="error" icon={{ name: 'ban' }} title="offline" />
  </div>
)

export default StatusIconExampleShorthand
