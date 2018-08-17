import React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalExamplePortal extends React.Component<any, any> {
  public state = {
    log: [],
    logCount: 0,
    open: false,
  }

  public render() {
    const { log, logCount, open } = this.state

    const portal = (
      <Portal
        closeOnTriggerClick
        openOnTriggerClick
        trigger={<Button content={open ? 'Close Portal' : 'Open Portal'} />}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <div
          style={{
            background: '#ddd',
            left: this.props.left,
            position: 'fixed',
            top: '50%',
            zIndex: 1000,
          }}
        >
          <Header>This is a basic portal</Header>
          <p>Portals have tons of great callback functions to hook into.</p>
          <p>To close, simply click the close button or click away</p>
        </div>
      </Portal>
    )

    const controls = (
      <div>
        <Button size="small" onClick={this.clearLog} content="Clear" />
        <span>
          Event Log <Label circular>{logCount}</Label>
        </span>
        <pre>{log.map((e, i) => <div key={i}>{e}</div>)}</pre>
      </div>
    )

    return (
      <div>
        {portal}
        <Divider />
        {controls}
      </div>
    )
  }

  private handleOpen = () => {
    this.setState({ open: true })
    this.writeLog('onOpen()')
  }

  private handleClose = () => {
    this.setState({ open: false })
    this.writeLog('onClose()')
  }

  private clearLog = () => this.setState({ log: [], logCount: 0 })

  private writeLog = eventName =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: ${eventName}`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })
}

const Portals = (
  <div>
    <PortalExamplePortal left="10%" />
    <Divider />
    <PortalExamplePortal left="30%" />
    <Divider />
    <PortalExamplePortal left="70%" />
    <Divider />
  </div>
)

export default Portals
