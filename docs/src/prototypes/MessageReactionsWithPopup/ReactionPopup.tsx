import * as React from 'react'
import keyboardKey from 'keyboard-key'
import { Popup, Menu, Ref } from '@stardust-ui/react'

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

  reactionNode: HTMLButtonElement

  popup: HTMLElement

  handleKeyDownOnMenu = (e, props) => {
    if ((e.shiftKey && e.keyCode === keyboardKey.Tab) || e.keyCode === keyboardKey.Tab) {
      this.setState({ open: false })
    }
  }

  handleOpenChange = (e, { open }) => {
    this.setState({
      open,
    })
  }

  render() {
    const { Component, props } = this.props
    return (
      <Ref
        innerRef={(reactionNode: HTMLButtonElement) => {
          this.reactionNode = reactionNode
        }}
      >
        <Popup
          trigger={
            <Component
              as="button"
              {...props}
              aria-label={getAriaLabel(props.content, props.icon)}
              aria-haspopup="true"
            />
          }
          inline
          content={{
            content: (
              <Ref
                innerRef={(popupNode: HTMLElement) => {
                  this.popup = popupNode
                }}
              >
                <Menu
                  items={['Jane Doe', 'John Doe']}
                  vertical
                  variables={{ borderColor: 'transparent' }}
                  onKeyDown={this.handleKeyDownOnMenu}
                />
              </Ref>
            ),
          }}
          open={this.state.open}
          onOpenChange={this.handleOpenChange}
          on={'hover'}
          // accessibility={popupAutoFocusBehavior}
        />
      </Ref>
    )
  }
}

export default ReactionPopup
