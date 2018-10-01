import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

class PopupExample extends React.Component<any, any> {
  state = { popupOpen: false }

  togglePopup() {
    this.setState(prev => ({ popupOpen: !prev.popupOpen }))
  }

  handleOpenChange = (e, newProps) => {
    this.setState({ popupOpen: newProps.open })
    alert(`Popup open state was changed to "${newProps.open ? 'true' : 'false'}".`)
  }

  render() {
    return (
      <Popup
        open={this.state.popupOpen}
        onOpenChange={this.handleOpenChange.bind(this)}
        content="Add users to your feed."
      >
        <Button icon="expand" onClick={() => this.togglePopup()} />
      </Popup>
    )
  }
}

export default PopupExample
