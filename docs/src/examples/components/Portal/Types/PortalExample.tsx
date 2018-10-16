import React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalExamplePortal extends React.Component {
  state = { log: [], logCount: 0 }

  handleClick = () =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: handleClick`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })

  clearLog = () => this.setState({ log: [], logCount: 0 })

  render() {
    const { log, logCount } = this.state

    return (
      <div>
        <Portal trigger={<Button content={'Toggle portal'} onClick={this.handleClick} />}>
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
        </Portal>
        <Divider />
        <div>
          <Button size="small" onClick={this.clearLog} content="Clear" />
          <span>
            Event Log <Label circular>{logCount}</Label>
          </span>
          <pre>{log.map((e, i) => <div key={i}>{e}</div>)}</pre>
        </div>
      </div>
    )
  }
}

export default PortalExamplePortal
