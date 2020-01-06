import * as React from 'react'
import { Status } from '@fluentui/react'

const StatusCustomExampleShorthand = () => (
  <div>
    <Status color="orange" icon={{ name: 'call-pstn' }} title="In call" />
    &emsp;
    <Status color="blue" icon={{ name: 'onedrive' }} title="Working from the sky" />
    &emsp;
    <Status color="red" icon={{ name: 'ban' }} title="Offline" />
  </div>
)

export default StatusCustomExampleShorthand
