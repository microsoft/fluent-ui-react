import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const TooltipExamplePointing = () => (
  <Tooltip open pointing content={`The tooltip is pointing.`}>
    <Button icon="expand" />
  </Tooltip>
)

export default TooltipExamplePointing
