import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import { Button, Flex, Input, Toolbar, Ref, Chat } from '@stardust-ui/react'
import { toolbarItems } from './mockData'

interface ThreadReplyEditorState {
  editMode: boolean
}

class ThreadReplyEditor extends React.Component<{}, ThreadReplyEditorState> {
  state = {
    editMode: false,
  }

  buttonRef = React.createRef<HTMLElement>()
  inputRef = React.createRef<HTMLElement>()

  renderReplyButton = () => {
    return (
      <Ref innerRef={this.buttonRef}>
        <Button
          fluid
          style={{ border: 'none', justifyContent: 'start' }}
          content="Reply"
          onClick={() => {
            this.setState({ editMode: true }, () => {
              if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus()
              }
            })
          }}
        />
      </Ref>
    )
  }

  renderEditor = () => {
    return (
      <Chat.Message className="ui-chat__message__reply-editor">
        <Flex
          column
          onKeyDown={e => {
            const eventCode = keyboardKey.getCode(e)
            if (eventCode === keyboardKey.Escape) {
              this.setState({ editMode: false }, () => {
                if (this.buttonRef && this.buttonRef.current) {
                  this.buttonRef.current.focus()
                }
              })
              e.stopPropagation()
              e.preventDefault()
            }
          }}
        >
          <Input
            fluid
            placeholder="Reply"
            inputRef={this.inputRef}
            // input={{ styles: { height: '3.1429rem' /* 44px */ } }}
            // styles={{ ...getInputWrapperStyles(props), borderColor: siteVars.colors.grey[200] }}
            // variables={{ backgroundColor: siteVars.colors.white }}
          />
          <Flex space="between">
            <Toolbar items={toolbarItems} aria-label="Editor tools" data-is-focusable={true} />
            <Flex gap="gap.small">
              <Button circular icon="send" iconOnly title="Send reply" text />
            </Flex>
          </Flex>
        </Flex>
      </Chat.Message>
    )
  }

  render() {
    return this.state.editMode ? this.renderEditor() : this.renderReplyButton()
  }
}

export default ThreadReplyEditor
