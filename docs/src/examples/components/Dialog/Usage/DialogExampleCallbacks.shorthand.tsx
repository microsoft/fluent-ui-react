import { useBooleanKnob, useCallbackLogKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleCallbacks = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const [onCancel] = useCallbackLogKnob('onCancel()', () => setOpen(false))
  const [onConfirm] = useCallbackLogKnob('onConfirm()', () => setOpen(false))
  const [onOpen] = useCallbackLogKnob('onOpen()', () => setOpen(true))

  return (
    <Dialog
      cancelButton="Cancel"
      confirmButton="Confirm"
      onCancel={onCancel}
      onConfirm={onConfirm}
      onOpen={onOpen}
      open={open}
      header="Action confirmation"
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleCallbacks
