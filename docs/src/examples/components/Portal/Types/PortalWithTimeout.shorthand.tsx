import React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalWithTimeout extends React.Component {
  state = { log: [], logCount: 0, open: false }

  handleClick = (logContent: string) => {
    setTimeout(() => {
      this.setState({ open: !this.state.open })
    }, 500)

    const btn = document.querySelector('.btn')
    btn && btn.remove()
    this.writeLog(logContent)
  }

  clearLog = () => this.setState({ log: [], logCount: 0 })

  writeLog = eventName =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: ${eventName}`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })

  render() {
    const { log, logCount, open } = this.state
    const btnContent = open ? 'Close Portal' : 'Open Portal'

    return (
      <div>
        <div>
          <Button
            className="btn"
            content={btnContent}
            onClick={this.handleClick.bind(this, btnContent)}
          />
          <Divider />
          <Button size="small" onClick={this.clearLog} content="Clear" />
          <span>
            Event Log <Label circular>{logCount}</Label>
          </span>
          <pre>{log.map((e, i) => <div key={i}>{e}</div>)}</pre>
        </div>
        <Portal
          open={open}
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
        />
      </div>
    )
  }
}

export default PortalWithTimeout
