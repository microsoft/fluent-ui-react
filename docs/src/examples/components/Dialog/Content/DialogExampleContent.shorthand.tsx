import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleContent: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content="Are you sure you want to confirm this action?"
    header="Action confirmation"
    headerAction={{ icon: 'more' }}
    trigger={<Button content="Open a dialog" />}
  />
)

export default DialogExampleContent
