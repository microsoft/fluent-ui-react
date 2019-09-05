import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleBackdrop = () => {
  const [backdrop] = useBooleanKnob({ name: 'backdrop', initialValue: true })
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  return (
    <Dialog
      backdrop={backdrop}
      content={
        <>
          <p>
            <code>Dialog</code> has <code>backdrop={backdrop.toString()}</code> now.
          </p>
          <Button content="Close Dialog" onClick={() => setOpen(false)} />
        </>
      }
      open={open}
      onOpen={() => setOpen(true)}
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleBackdrop
