import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleInert = () => {
  const [inert] = useBooleanKnob({ name: 'inert', initialValue: true })

  return (
    <Dialog
      cancelButton="Cancel"
      confirmButton="Confirm"
      header="Action confirmation"
      inert={inert}
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleInert
