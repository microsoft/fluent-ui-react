import { useBooleanKnob } from '@stardust-ui/docs-components'
import * as React from 'react'
import { Button, MenuButton } from '@stardust-ui/react'

const MenuButtonControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open', initialValue: true })

  return (
    <MenuButton
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon="expand" title="Open MenuButton" />}
      menu={['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]}
    />
  )
}

export default MenuButtonControlledExample
