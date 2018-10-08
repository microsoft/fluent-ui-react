import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

class PopupContentWrapperExample extends React.Component<any, any> {
  state = {
    firstPopupOpen: false,
    secondPopupOpen: false,
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
          trigger={
            <Button
              icon="expand"
              onClick={() => this.setState(prev => ({ firstPopupOpen: !prev.firstPopupOpen }))}
              content="Popup with plain content"
            />
          }
        />

        <Popup
          open={this.state.secondPopupOpen}
          content={{ content: <p style={plainContentStyle}>Popup content rendered in wrapper.</p> }}
          trigger={
            <Button
              icon="expand"
              onClick={() => this.setState(prev => ({ secondPopupOpen: !prev.secondPopupOpen }))}
              content="Popup with wrapped content"
            />
          }
        />
      </>
    )
  }
}

export default PopupContentWrapperExample
