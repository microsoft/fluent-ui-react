import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const TooltipExample = () => (
  <Tooltip trigger={<Button icon="expand" />} content="Hello from tooltip!" />
)

export default TooltipExample
