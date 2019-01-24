import * as React from 'react'
import { Button, Input, Popup } from '@stardust-ui/react'

class PopupControlledExample extends React.Component {
  state = { open: false }

  handleOpenChange = (e, { open }) => {
    alert(`Popup requested to change its open state to "${open}".`)
    this.setState({ open })
  }

  render() {
    return (
      <Popup
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        trigger={<Button icon="expand" />}
        content={{ content: <Input icon="search" placeholder="Search..." /> }}
      />
    )
  }
}

export default PopupControlledExample
