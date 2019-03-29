import * as React from 'react'
import { Button, Popup, Dialog, popupFocusTrapBehavior } from '@stardust-ui/react'

const PopupExample = () => (
  <Popup
    trigger={<Button icon="expand" />}
    accessibility={popupFocusTrapBehavior}
    content={
      <Dialog
        cancelButton="Cancel"
        confirmButton="Confirm"
        header="Action confirmation"
        trigger={<Button content="Open a dialog" />}
      />
    }
  />
)

export default PopupExample
