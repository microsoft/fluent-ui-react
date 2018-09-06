import * as React from 'react'
import { StatusIndicator } from '@stardust-ui/react'

const StatusIndicatorShorthandExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <StatusIndicator />
    <StatusIndicator
      icon={{ name: 'check', variables: { color: 'white', backgroundColor: 'green' } }}
      title="Available"
    />
    <StatusIndicator
      icon={{ name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } }}
      title="Away"
    />
    <StatusIndicator
      icon={{ name: 'clock', variables: { color: 'white', backgroundColor: 'yellow' } }}
      title="Be right back"
    />
    <StatusIndicator
      icon={{ variables: { color: 'white', backgroundColor: 'red' } }}
      title="Busy"
    />
    <StatusIndicator
      icon={{ name: 'minus', variables: { color: 'white', backgroundColor: 'red' } }}
      title="Do not disturb"
    />
    <StatusIndicator
      icon={{ name: 'home', variables: { color: 'white', backgroundColor: 'blue' } }}
      title="Working from Home"
    />
  </div>
)

export default StatusIndicatorShorthandExample
