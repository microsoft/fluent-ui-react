import * as React from 'react'
import { StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorCustomShorthandExample = () => (
  <div>
    <StatusIndicator
      icon={{ name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } }}
      title="Be right back"
    />
    &emsp;
    <StatusIndicator
      icon={{ name: 'home', variables: { color: 'white', backgroundColor: 'blue' } }}
      title="Working from home"
    />
    &emsp;
    <StatusIndicator
      icon={{ name: 'minus', variables: { color: 'white', backgroundColor: 'red' } }}
      title="Do not disturb"
    />
  </div>
)

export default StatusIndicatorCustomShorthandExample
