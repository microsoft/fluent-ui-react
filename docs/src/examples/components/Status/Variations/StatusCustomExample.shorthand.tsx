import * as React from 'react'
import { Status, Avatar } from '@stardust-ui/react'

const StatusCustomShorthandExample = () => (
  <div>
    <Status color="orange" icon="clock" title="Be right back" />
    &emsp;
    <Status color="blue" icon="home" title="Working from home" />
    &emsp;
    <Status color="red" icon="minus" title="Do not disturb" />
  </div>
)

export default StatusCustomShorthandExample
