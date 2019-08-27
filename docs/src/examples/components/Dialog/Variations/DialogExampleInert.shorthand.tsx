import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleInert = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    header="Action confirmation"
    inert
    trigger={<Button content="Open a dialog" />}
  />
)

export default DialogExampleInert
