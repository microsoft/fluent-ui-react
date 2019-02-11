import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusCustomExampleShorthand = () => (
  <div>
    <Status color="orange" icon="clock" title="Be right back" alt="be right back" />
    &emsp;
    <Status color="blue" icon="home" title="Working from home" alt="working from home" />
    &emsp;
    <Status color="red" icon="minus" title="Do not disturb" alt="do not disturb" />
  </div>
)

export default StatusCustomExampleShorthand
