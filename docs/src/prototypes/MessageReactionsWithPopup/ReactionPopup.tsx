import * as React from 'react'
import keyboardKey from 'keyboard-key'
import { Popup, Menu, Ref } from '@stardust-ui/react'
import { AutoFocusZone } from 'src/lib/accessibility/FocusZone/AutoFocusZone'

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
      <Popup
        trigger={
          <Component
            as="button"
            {...props}
            aria-label={getAriaLabel(this.props.content, this.props.icon)}
            aria-haspopup="true"
            tabIndex={
              this.state.open
                ? '-1'
                : undefined /* TODO: this doesn't work because of the focus zone inside the ChatMessage :\ */
            }
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
              <AutoFocusZone firstFocusableSelector={'ui-menu__item:first-child'}>
                <Menu
                  items={['Jane Doe', 'John Doe']}
                  vertical
                  data-is-focusable={true}
                  variables={{ borderColor: 'transparent' }}
                  onKeyDown={this.handleKeyDownOnMenu}
                />
              </AutoFocusZone>
            </Ref>
          ),
        }}
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
        on={'hover'}
      />
    )
  }
}

export default ReactionPopup
