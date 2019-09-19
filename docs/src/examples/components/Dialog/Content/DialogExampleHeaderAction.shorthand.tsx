import * as React from 'react'
import { Button, Dialog } from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const DialogExampleHeaderAction: React.FC = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })
  return (
    <Dialog
      open={open}
      onOpen={(e, { open }) => setOpen(open)}
      confirmButton="Confirm"
      content="Are you sure you want to confirm this action?"
      header="Action confirmation"
      headerAction={{ icon: 'close', title: 'Close', onClick: () => setOpen(false) }}
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleHeaderAction
