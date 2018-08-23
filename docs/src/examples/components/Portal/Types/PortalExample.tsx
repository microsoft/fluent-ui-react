import React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalExamplePortal extends React.Component<any, any> {
  public state = {
    log: [],
    logCount: 0,
  }

  public render() {
    const { log, logCount } = this.state

    const controls = (
      <div>
        <Button size="small" onClick={this.clearLog} content="Clear" />
        <span>
          Event Log <Label circular>{logCount}</Label>
        </span>
        <pre>{log.map((e, i) => <div key={i}>{e}</div>)}</pre>
      </div>
    )

    const portalContent = (
      <div
        style={{
          background: '#ddd',
          position: 'fixed',
          left: '40%',
          top: '45%',
          zIndex: 1000,
        }}
      >
        <Header>This is a basic portal</Header>
        <p>Portals have tons of great callback functions to hook into.</p>
        <p>To close, simply click the close button or click away</p>
      </div>
    )

    return (
      <div>
        {
          <Portal trigger={<Button content={'Toggle portal'} onClick={this.handleClick} />}>
            {portalContent}
          </Portal>
        }
        <Divider />
        {controls}
      </div>
    )
  }

  private handleClick = () =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: handleClick`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })

  private clearLog = () => this.setState({ log: [], logCount: 0 })
}

export default PortalExamplePortal
