import * as React from 'react'
import { Status } from '@stardust-ui/react'

const StatusTypeExampleShorthand = () => (
  <div>
    <Status state="success" alt="success" /> <code>state="success"</code>
    <br />
    <Status state="info" alt="info" /> <code>state="info"</code>
    <br />
    <Status state="warning" alt="warning" /> <code>state="warning"</code>
    <br />
    <Status state="error" alt="error" /> <code>state="error"</code>
    <br />
    <Status state="unknown" alt="unknown" /> <code>state="unknown"</code>
  </div>
)

export default StatusTypeExampleShorthand
