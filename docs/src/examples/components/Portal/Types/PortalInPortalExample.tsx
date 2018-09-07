import React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalInPortalExample extends React.Component {
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
        <Portal
          content={
            <div
              style={{
                background: '#ddd',
                position: 'fixed',
                left: '40%',
                top: '45%',
                zIndex: 1000,
                padding: '15px',
                backgroundColor: '#fff',
                border: '1px solid black',
              }}
            >
              <Header>This is a portal with focus trap</Header>
              <p>Portals have tons of great callback functions to hook into.</p>
              <p>To close, simply click the close button or click away</p>
              <Button content={'Click me'} />

              <p>More text</p>
              <p tabIndex={0}>Paragraph element but with tabindex = 0</p>
              <a href="/">Link element</a>
            </div>
          }
          trigger={<Button content={'Toggle portal'} onClick={this.handleClick} />}
        />
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

export default PortalInPortalExample
