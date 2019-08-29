import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Dialog } from '@stardust-ui/react'
import * as React from 'react'

const DialogExampleNotification = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })
  const timeoutId = React.useRef<number>()

  React.useEffect(() => {
    if (open) {
      timeoutId.current = window.setTimeout(() => {
        setOpen(false)
      }, 2000)
    }

    return () => clearTimeout(timeoutId.current)
  }, [open])

  return (
    <>
      <Button
        content="Open a notification"
        onClick={() => {
          setOpen(true)
        }}
      />

      <Dialog
        content="An important message. Will hide in 2s."
        modal={false}
        open={open}
        variables={{
          foregroundColor: 'white',
          contentMargin: 0,
          rootBackground: 'black',
          rootPadding: '10px',
          rootWidth: '300px',
        }}
      />
    </>
  )
}

export default DialogExampleNotification
