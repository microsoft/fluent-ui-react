import * as React from 'react'
import { Button, Divider, Header, Label, Portal } from '@stardust-ui/react'

class PortalExampleControlled extends React.Component<any, any> {
  public state = {
    log: [],
    logCount: 0,
    open: false,
  }

  public render() {
    const { log, logCount, open } = this.state
    const content = open ? 'Close Portal' : 'Open Portal'

    const controls = (
      <div>
        <Button content={content} onClick={this.handleClick.bind(this, content)} />
        <Divider />
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
        <Header>This is a controlled portal</Header>
        <p>Portals have tons of great callback functions to hook into.</p>
        <p>To close, simply click the close button</p>
      </div>
    )

    return (
      <div>
        {controls}
        {<Portal open={open}>{portalContent}</Portal>}
      </div>
    )
  }

  private handleClick = (logContent: string) => {
    this.setState({ open: !this.state.open })
    this.writeLog(logContent)
  }

  private clearLog = () => this.setState({ log: [], logCount: 0 })

  private writeLog = eventName =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: ${eventName}`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })
}

export default PortalExampleControlled
