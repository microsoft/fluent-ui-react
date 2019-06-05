import * as React from 'react'
import { Button, Input, Tooltip } from '@stardust-ui/react'

class TooltipControlledExample extends React.Component {
  state = { open: false }

  handleOpenChange = (e, { open }) => {
    alert(`Tooltip requested to change its open state to "${open}".`)
    this.setState({ open })
  }

  render() {
    return (
      <Tooltip
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        content={{ content: <Input icon="search" placeholder="Search..." /> }}
      >
        <Button icon="expand" />
      </Tooltip>
    )
  }
}

export default TooltipControlledExample
