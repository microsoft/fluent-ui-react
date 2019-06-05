import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

class TooltipControlledExample extends React.Component {
  state = { open: false }

  handleOpenChange = (e, { open }) => {
    console.log(`Tooltip requested to change its open state to "${open}".`)
    this.setState({ open })
  }

  render() {
    return (
      <Tooltip
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        trigger={<Button icon="expand" />}
        content={{ content: 'This is a controlled Tooltip' }}
      />
    )
  }
}

export default TooltipControlledExample
