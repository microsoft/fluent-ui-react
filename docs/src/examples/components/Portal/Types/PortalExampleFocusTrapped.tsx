import React from 'react'
import { Button, Header, Portal } from '@stardust-ui/react'

class PortalExamplePortal extends React.Component {
  state = { open: false }

  openPortal = () => {
    this.setState({ open: true })
  }

  closePortal = () => {
    this.setState({ open: false })
  }

  render() {
    const { open } = this.state
    const btnContent = open ? 'Close Portal' : 'Open Portal'

    return (
      <div>
        <Button content={btnContent} onClick={this.openPortal} />
        <Portal
          open={open}
          trapFocus={true}
          focusTrapZoneProps={{
            isClickableOutsideFocusTrap: false,
          }}
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
            <Header>This portal traps focus on appearance</Header>
            <p tabIndex={0}>
              Portal doesn't close on outside click, as 'isClickableOutsideFocusTrap' was set to
              'false' for example purpose.
            </p>
            <p tabIndex={0}>To close, simply click the close button</p>
            <Button size="small" content="Do nothing" />
            <Button size="small" content="Close popup" onClick={this.closePortal} />
          </div>
        </Portal>
      </div>
    )
  }
}

export default PortalExamplePortal
