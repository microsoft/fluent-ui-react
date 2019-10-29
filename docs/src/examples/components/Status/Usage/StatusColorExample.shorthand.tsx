import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusColorExampleShorthand = () => (
  <div>
    <Status styles={{ background: 'red' }} title="red" />
    &emsp;
    <Status styles={{ background: 'orange' }} title="orange" />
    &emsp;
    <Status styles={{ background: 'yellow' }} title="yellow" />
    &emsp;
    <Status styles={{ background: 'green' }} title="green" />
    &emsp;
    <Status styles={{ background: 'blue' }} title="blue" />
    &emsp;
    <Status styles={{ background: 'violet' }} title="violet" />
  </div>
)

export default StatusColorExampleShorthand
