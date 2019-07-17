import { useBooleanKnob } from '@stardust-ui/docs-components'
import * as React from 'react'
import { Button, Input, Popup, Flex } from '@stardust-ui/react'

const PopupControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const popupContent = (
    <Flex column>
      <Flex.Item align="end">
        <Button text iconOnly icon="close" onClick={() => setOpen(false)} title="Close" />
      </Flex.Item>
      <Input icon="search" placeholder="Search..." />
    </Flex>
  )

  return (
    <Popup
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon="expand" title="Open popup" />}
      content={popupContent}
      trapFocus
    />
  )
}

export default PopupControlledExample
