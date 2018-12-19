import React from 'react'
import { Button, Input, Popup } from '@stardust-ui/react'

class PopupControlledExample extends React.Component {
  state = { open: false }

  handleOpenChange = (e, { open }) => this.setState({ open })

  render() {
    return (
      <Popup
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        content={{ content: <Input icon="search" placeholder="Search..." /> }}
      >
        <Button icon="expand" />
      </Popup>
    )
  }
}

export default PopupControlledExample
