import * as React from 'react'
import { Button, Input, Popup } from '@stardust-ui/react'

class PopupControlledExample extends React.Component<any, any> {
  state = { popupOpen: false }

  togglePopup() {
    this.setState(prev => ({ popupOpen: !prev.popupOpen }))
  }

  render() {
    return (
      <Popup
        open={this.state.popupOpen}
        onOpenChange={(e, newProps) => {
          alert(`Popup is requested to change its open state to "${newProps.open}".`)
          this.setState({ popupOpen: newProps.open })
        }}
        content={{ content: <Input icon="search" placeholder="Search..." /> }}
      >
        <Button icon="expand" onClick={() => this.togglePopup()} />
      </Popup>
    )
  }
}

export default PopupControlledExample
