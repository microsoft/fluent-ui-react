import { useBooleanKnob, useLogKnob } from '@stardust-ui/docs-components'
import { Button, Dialog, DialogProps } from '@stardust-ui/react'
import * as React from 'react'

const logFormatter = (name: string, e: React.SyntheticEvent, data: DialogProps) => {
  return [
    `[${new Date().toLocaleTimeString()}]`,
    `${name}(e: { type: ${e.type} }, data: { open: ${data.open} })`,
  ].join(' ')
}

const DialogExampleCallbacks = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const onCancel = useLogKnob('onCancel', () => setOpen(false), logFormatter)
  const onConfirm = useLogKnob('onConfirm', () => setOpen(false), logFormatter)
  const onOpen = useLogKnob('onOpen', () => setOpen(true), logFormatter)

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
