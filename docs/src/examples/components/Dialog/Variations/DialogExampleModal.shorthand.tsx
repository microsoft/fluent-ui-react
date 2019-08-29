import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleModal = () => {
  const [modal] = useBooleanKnob({ name: 'modal', initialValue: true })
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  return (
    <Dialog
      content={
        <>
          <p>
            <code>Dialog</code> has <code>modal={modal.toString()}</code> now.
          </p>
          <Button content="Close Dialog" onClick={() => setOpen(false)} />
        </>
      }
      modal={modal}
      open={open}
      onOpen={() => setOpen(true)}
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleModal
