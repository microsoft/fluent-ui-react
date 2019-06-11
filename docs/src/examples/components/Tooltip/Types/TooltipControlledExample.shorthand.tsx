import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const TooltipControlledExample = () => {
  const [open] = useBooleanKnob({ name: 'open-c', initialValue: true })

  return (
    <Tooltip
      open={open}
      trigger={<Button icon="expand" />}
      content={{ content: 'This is a controlled Tooltip' }}
    />
  )
}

export default TooltipControlledExample
