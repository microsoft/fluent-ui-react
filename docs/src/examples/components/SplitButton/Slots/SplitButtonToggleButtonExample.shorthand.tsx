import { useBooleanKnob } from '@stardust-ui/docs-components'
import { SplitButton } from '@stardust-ui/react'
import * as React from 'react'

const SplitButtonExampleToggleButtonShorthand = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  return (
    <SplitButton
      menu={[
        { key: 'group', content: 'New group message' },
        { key: 'channel', content: 'New channel message' },
      ]}
      button="New conversation"
      toggleButton={{ icon: open ? 'triangle-up' : 'triangle-down' }}
      onOpenChange={(e, { open }) => setOpen(open)}
    />
  )
}

export default SplitButtonExampleToggleButtonShorthand
