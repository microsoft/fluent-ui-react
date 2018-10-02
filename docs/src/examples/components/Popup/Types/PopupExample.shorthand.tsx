import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

class PopupExample extends React.Component<any, any> {
  state = { popupOpen: false }

  togglePopup() {
    this.setState(prev => ({ popupOpen: !prev.popupOpen }))
  }

  render() {
    return (
      <Popup
        open={this.state.popupOpen}
        onOpenChange={(e, newProps) => {
          this.setState({ popupOpen: newProps.open })
          alert(`Popup open state was changed to "${newProps.open ? 'true' : 'false'}".`)
        }}
        trigger={<Button icon="expand" onClick={() => this.togglePopup()} />}
        content="Add users to your feed."
      />
    )
  }
}

export default PopupExample
