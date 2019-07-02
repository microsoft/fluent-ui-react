import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const TooltipExample = () => (
  <Tooltip content="Hello from tooltip!">
    <Button content="Click me!" />
  </Tooltip>
)

export default TooltipExample
