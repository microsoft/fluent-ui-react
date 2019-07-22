import { useBooleanKnob } from '@stardust-ui/docs-components'
import * as React from 'react'
import { Button, ContextMenu } from '@stardust-ui/react'

const items = ['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]

const ContextMenuControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open', initialValue: true })

  return (
    <ContextMenu
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon="expand" title="Open ContextMenu" />}
      menu={{ items }}
    />
  )
}

export default ContextMenuControlledExample
