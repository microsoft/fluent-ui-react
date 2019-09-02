import { LogInspector, useBooleanKnob, useCallbackLogKnob } from '@stardust-ui/docs-components'
import { Button, Dialog, Grid } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleCallbacks = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const [onCancel] = useCallbackLogKnob({ name: 'onCancel()', callback: () => setOpen(false) })
  const [onConfirm] = useCallbackLogKnob({ name: 'onConfirm()', callback: () => setOpen(false) })
  const [onOpen] = useCallbackLogKnob({ name: 'onOpen()', callback: () => setOpen(true) })

  return (
    <Grid columns={2}>
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
      <LogInspector />
    </Grid>
  )
}

export default DialogExampleCallbacks
