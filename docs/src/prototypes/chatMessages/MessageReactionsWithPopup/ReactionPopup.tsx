import * as React from 'react'
import keyboardKey from 'keyboard-key'
import { Popup, Menu, Reaction, popupAutoFocusBehavior } from '@stardust-ui/react'

class ReactionPopup extends React.Component<any, any> {
  state = {
    open: false,
  }

  handleKeyDownOnMenu = e => {
    if ((e.shiftKey && e.keyCode === keyboardKey.Tab) || e.keyCode === keyboardKey.Tab) {
      this.setState({ open: false })
    }
  }

  handleOpenChange = (e, { open }) => {
    this.setState({ open })
  }

  render() {
    return (
      <Popup
        trigger={<Reaction {...this.props} as="button" aria-haspopup="true" />}
        content={{
          content: (
            <Menu
              items={['Jane Doe', 'John Doe']}
              vertical
              variables={{ borderColor: 'transparent' }}
              onKeyDown={this.handleKeyDownOnMenu}
            />
          ),
        }}
        inline
        on="hover"
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        accessibility={popupAutoFocusBehavior}
      />
    )
  }
}

export default ReactionPopup
