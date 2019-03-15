import * as React from 'react'
import { Alert } from '@stardust-ui/react'

class AlertExampleClosable extends React.Component<{}, { open: boolean }> {
  state = { open: true }

  render() {
    return (
      this.state.open && (
        <Alert content="This is a closable alert" onClose={() => this.setState({ open: false })} />
      )
    )
  }
}

export default AlertExampleClosable
