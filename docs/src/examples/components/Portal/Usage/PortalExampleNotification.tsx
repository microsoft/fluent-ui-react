import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Button, Portal } from '@stardust-ui/react'
import * as React from 'react'

const PortalExampleNotification = () => {
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

      <Portal
        onOutsideClick={}
        open={open}
        variables={{
          foregroundColor: 'white',
          contentMargin: 0,
          rootBackground: 'black',
          rootPadding: '10px',
          rootWidth: '300px',
        }}
      >
        An important message. Will hide in 2s.
      </Portal>
    </>
  )
}

export default PortalExampleNotification
