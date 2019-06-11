import * as React from 'react'
import { Button, Input, Tooltip } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const TooltipOpenControlledExample = () => {
  const [open] = useBooleanKnob({ name: 'open-c', initialValue: true })

  return (
    <Tooltip
      open={open || undefined}
      content={{ content: <Input icon="search" placeholder="Search..." /> }}
    >
      <Button icon="expand" />
    </Tooltip>
  )
}

export default TooltipOpenControlledExample
