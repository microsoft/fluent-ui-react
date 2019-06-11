import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const TooltipControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open-c', initialValue: true })

  return (
    <Tooltip
      open={open}
      onOpenChange={(e, data) => setOpen(data.open)}
      trigger={<Button icon="expand" />}
      content={{ content: 'This is a controlled Tooltip' }}
    />
  )
}

export default TooltipControlledExample
