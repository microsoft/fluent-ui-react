import * as React from 'react'
import { Button, Tooltip } from '@fluentui/react'

const TooltipExamplePointing = () => (
  <Tooltip open pointing content="The tooltip is pointing.">
    <Button icon={{ name: 'more' }} />
  </Tooltip>
)

export default TooltipExamplePointing
