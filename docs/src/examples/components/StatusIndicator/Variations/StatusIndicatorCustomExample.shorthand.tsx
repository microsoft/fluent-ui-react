import * as React from 'react'
import { StatusIndicator, Avatar } from '@stardust-ui/react'

const StatusIndicatorCustomShorthandExample = () => (
  <div>
    <StatusIndicator color="orange" icon="clock" title="Be right back" />
    &emsp;
    <StatusIndicator color="blue" icon="home" title="Working from home" />
    &emsp;
    <StatusIndicator color="red" icon="minus" title="Do not disturb" />
  </div>
)

export default StatusIndicatorCustomShorthandExample
