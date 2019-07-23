import * as React from 'react'
import { Button, Dialog, Popup } from '@stardust-ui/react'

export const selectors = {
  dialogCancel: 'dialog-cancel',
  dialogHeader: Dialog.slotClassNames.header,
  dialogOverlay: Dialog.slotClassNames.overlay,
  dialogTrigger: 'dialog-trigger',
  popupContent: Popup.Content.className,
  popupTrigger: 'popup-trigger',
}

const DialogInPopupExample = () => (
  <Popup
    content={{
      content: (
        <Dialog
          cancelButton={{ content: 'Close', id: selectors.dialogCancel }}
          header="A dialog"
          trigger={<Button id={selectors.dialogTrigger} content="Open a dialog" />}
        />
      ),
    }}
    trigger={<Button id={selectors.popupTrigger} content="Open a popup" />}
  />
)

export default DialogInPopupExample
