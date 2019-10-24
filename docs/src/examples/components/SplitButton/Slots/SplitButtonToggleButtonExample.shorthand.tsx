import { useBooleanKnob } from '@stardust-ui/docs-components'
import { SplitButton } from '@stardust-ui/react'
import * as React from 'react'

const SplitButtonExampleToggleButtonShorthand = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  return (
    <>
      <SplitButton
        menu={[
          { key: 'group', content: 'New group message' },
          { key: 'channel', content: 'New channel message' },
        ]}
        button={{
          content: 'New conversation',
          'aria-roledescription': 'splitbutton',
          'aria-describedby': 'instruction-message-icon',
        }}
        toggleButton={{
          icon: open ? 'triangle-up' : 'triangle-down',
          'aria-label': 'more options',
        }}
        onOpenChange={(e, { open }) => setOpen(open)}
        onMainButtonClick={() => alert('button was clicked')}
      />
      <span aria-hidden="true" id="instruction-message-icon" style={{ opacity: 0 }}>
        to open menu, press Alt + Arrow Down
      </span>
    </>
  )
}

export default SplitButtonExampleToggleButtonShorthand
