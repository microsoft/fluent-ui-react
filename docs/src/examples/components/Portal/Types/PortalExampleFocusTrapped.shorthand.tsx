import React from 'react'
import { Button, Header, Portal } from '@stardust-ui/react'

class PortalExampleFocusTrapped extends React.Component {
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
          trapFocus={true}
          focusTrapZoneProps={{
            isClickableOutsideFocusTrap: false,
          }}
          open={open}
          content={
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
              <p tabIndex={0}>
                Portal doesn't close on outside click, as 'isClickableOutsideFocusTrap' was set to
                'false' for example purpose.
              </p>
              <p tabIndex={0}>To close, simply click the close button</p>
              <Button size="small" content="Do nothing" />
              <Button size="small" content="Close popup" onClick={this.closePortal} />
            </div>
          }
        />
      </div>
    )
  }
}

export default PortalExampleFocusTrapped
