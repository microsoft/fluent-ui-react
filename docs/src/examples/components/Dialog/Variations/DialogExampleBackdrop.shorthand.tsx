import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleBackdrop = () => {
  const [backdrop] = useBooleanKnob({ initialValue: false, name: 'backdrop' })

  return (
    <Dialog
      backdrop={backdrop}
      cancelButton="Cancel"
      confirmButton="Confirm"
      header="Action confirmation"
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleBackdrop
