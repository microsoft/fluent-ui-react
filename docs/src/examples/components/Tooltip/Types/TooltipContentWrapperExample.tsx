import * as React from 'react'
import { Button, Flex, Tooltip } from '@stardust-ui/react'

const TooltipContentWrapperExample = () => {
  const plainContentStyle = {
    zIndex: 1000,
    padding: 5,
  }

  return (
    <Flex gap="gap.smaller">
      <Tooltip content={<p style={plainContentStyle}>Plain tooltip content rendered 'as is'.</p>}>
        <Button icon="expand" content="Tooltip with plain content" />
      </Tooltip>

      <Tooltip
        content={{ content: <p style={plainContentStyle}>Tooltip content rendered in wrapper.</p> }}
      >
        <Button icon="expand" content="Tooltip with wrapped content" />
      </Tooltip>
    </Flex>
  )
}

export default TooltipContentWrapperExample
