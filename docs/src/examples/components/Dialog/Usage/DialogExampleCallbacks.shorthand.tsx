import { Button, Dialog, Divider, Grid, Label, Segment } from '@stardust-ui/react'
import * as React from 'react'

type DialogExampleCallbacksState = {
  log: string[]
  logCount: number
  open: boolean
}

export default class DialogExampleCallbacks extends React.Component<
  {},
  DialogExampleCallbacksState
> {
  state = {
    log: [],
    logCount: 0,
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
    this.writeLog('onOpen()')
  }

  handleClose = (callbackName: string) => () => {
    console.log(callbackName)
    this.setState({ open: false })
    this.writeLog(callbackName)
  }

  clearLog = () => this.setState({ log: [], logCount: 0 })

  writeLog = (eventName: string) =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: ${eventName}`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    })

  render() {
    const { log, logCount, open } = this.state

    return (
      <Grid columns={2}>
        <Dialog
          cancelButton="Cancel"
          confirmButton="Confirm"
          onCancel={this.handleClose('onCancel()')}
          onConfirm={this.handleClose('onConfirm()')}
          onOpen={this.handleOpen}
          open={open}
          header="Action confirmation"
          trigger={<Button content="Open a dialog" />}
        />

        <Segment>
          <Button onClick={this.clearLog}>Clear</Button>
          Event Log <Label circular>{logCount}</Label>
          {log.length > 0 && <Divider />}
          <pre>
            {log.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </pre>
        </Segment>
      </Grid>
    )
  }
}
