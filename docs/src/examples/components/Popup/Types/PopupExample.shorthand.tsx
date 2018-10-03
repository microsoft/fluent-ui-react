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
        trigger={<Button icon="expand" onClick={() => this.togglePopup()} />}
        content="Add users to your feed."
      />
    )
  }
}

export default PopupExample
