import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const TooltipExamplePointing = () => {
  const [pointing] = useBooleanKnob({ name: 'pointing-s', initialValue: true })

  return (
    <Tooltip
      open
      pointing={pointing}
      trigger={<Button icon="expand" />}
      content={`The tooltip is ${pointing ? '' : 'not'} pointing.`}
    />
  )
}

export default TooltipExamplePointing
