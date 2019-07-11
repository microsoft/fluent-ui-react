import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExample: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    header="Action confirmation"
    headerAction={{ icon: 'more' }}
    trigger={<Button content="Open a dialog" />}
  />
)

export default DialogExample
