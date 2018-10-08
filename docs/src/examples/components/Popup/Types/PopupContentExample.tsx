import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

class PopupExample extends React.Component<any, any> {
  state = {
    firstPopupOpen: false,
    secondPopupOpen: false,
  }

  togglePopup(toggleFirst: boolean) {
    if (toggleFirst) {
      this.setState(prev => ({ firstPopupOpen: !prev.firstPopupOpen }))
    } else {
      this.setState(prev => ({ secondPopupOpen: !prev.secondPopupOpen }))
    }
  }

  render() {
    const plainContentStyle = {
      zIndex: 1000,
      padding: 5,
    }

    return (
      <>
        <Popup
          open={this.state.firstPopupOpen}
          content={<p style={plainContentStyle}>Plain popup content rendered 'as is'.</p>}
        >
          <Button
            icon="expand"
            onClick={() => this.togglePopup(true)}
            content="Popup with plain content"
          />
        </Popup>

        <Popup
          open={this.state.secondPopupOpen}
          content={{ content: <p style={plainContentStyle}>Popup content rendered in wrapper.</p> }}
        >
          <Button
            icon="expand"
            onClick={() => this.togglePopup(false)}
            content="Popup with wrapped content"
          />
        </Popup>
      </>
    )
  }
}

export default PopupExample
