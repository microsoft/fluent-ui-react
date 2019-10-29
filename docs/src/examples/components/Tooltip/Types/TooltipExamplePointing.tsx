import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const TooltipExamplePointing = () => (
  <Tooltip open pointing content="The tooltip is pointing.">
    <Button icon="more" />
  </Tooltip>
)

export default TooltipExamplePointing
