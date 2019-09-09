import { useBooleanKnob, useLogKnob } from '@stardust-ui/docs-components'
import { Button, Header, Portal } from '@stardust-ui/react'
import * as React from 'react'

const PortalExampleOpen = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })
  const onClick = useLogKnob('onClick()', () => setOpen(!open))

  return (
    <>
      <Button content={open ? 'Close Portal' : 'Open Portal'} onClick={onClick} />
      <Portal open={open}>
        <div
          style={{
            position: 'fixed',
            left: '40%',
            top: '45%',
            zIndex: 1000,
            backgroundColor: '#fff',
            padding: '15px',
            boxShadow: 'rgb(187, 187, 187) 0px 2px 8px',
            border: '1px solid rgba(34,36,38,.15)',
            borderRadius: '5px',
          }}
        >
          <Header>This is a controlled portal</Header>
          <p>Portals have tons of great callback functions to hook into.</p>
          <p>To close, simply click the close button</p>
        </div>
      </Portal>
    </>
  )
}

export default PortalExampleOpen
