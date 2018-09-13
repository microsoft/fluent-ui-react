import React from 'react'
import { Button, Header, Portal } from '@stardust-ui/react'

class PortalExamplePortal extends React.Component {
  render() {
    return (
      <Portal
        trigger={
          <Button
            content={'Toggle portal'}
            trapFocus={true}
            focusTrapZoneProps={{}}
          />
        }
      >
        <div
          style={{
            background: '#ddd',
            position: 'fixed',
            left: '40%',
            top: '45%',
            zIndex: 1000,
            padding: '10px',
          }}
        >
          <Header>This is a portal with focus trap!</Header>
          <p tabIndex={0}>Portals have tons of great callback functions to hook into.</p>
          <p tabIndex={0}>To close, simply click the close button or click away</p>
          <Button size="small" content="Button" />
          <Button size="small" content="Another button" />
        </div>
      </Portal>
    )
  }
}

export default PortalExamplePortal
