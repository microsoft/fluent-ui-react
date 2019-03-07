import * as React from 'react'
import keyboardKey from 'keyboard-key'
import { Popup, Menu, Reaction, popupAutoFocusBehavior } from '@stardust-ui/react'

const getAriaLabel = (numberOfPersons, emojiType) => {
  if (numberOfPersons === 1) {
    return `One person reacted to this message with a ${emojiType} emoji. Open menu to see person who reacted.`
  }
  return `${numberOfPersons} people reacted this message with a ${emojiType} emoji. Open menu to see people who reacted.`
}

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
    const { icon, content } = this.props
    return (
      <Popup
        trigger={
          <Reaction
            {...this.props}
            as="button"
            aria-label={getAriaLabel(content, icon)}
            aria-haspopup="true"
          />
        }
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
        allowKeyDownPropagation
        on="hover"
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        accessibility={popupAutoFocusBehavior}
      />
    )
  }
}

export default ReactionPopup
