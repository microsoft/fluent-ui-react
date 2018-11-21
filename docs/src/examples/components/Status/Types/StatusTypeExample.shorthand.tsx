import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusTypeExampleShorthand = () => (
  <div>
    <Status state="success" /> <code>state="success"</code>
    <br />
    <Status state="info" /> <code>state="info"</code>
    <br />
    <Status state="warning" /> <code>state="warning"</code>
    <br />
    <Status state="error" /> <code>state="error"</code>
    <br />
    <Status state="unknown" /> <code>state="unknown"</code>
  </div>
)

export default StatusTypeExampleShorthand
