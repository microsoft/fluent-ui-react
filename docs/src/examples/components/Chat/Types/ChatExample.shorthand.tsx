import {
  Accessibility,
  Avatar,
  Chat,
  Flex,
  Menu,
  Provider,
  toolbarBehavior,
  toolbarButtonBehavior,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import cx from 'classnames'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

export interface PopoverProps {
  className?: string
}

interface PopoverState {
  focused: boolean
}

const popoverBehavior: Accessibility = (props: any) => {
  const behavior = toolbarBehavior(props)

  behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
    return root.querySelector('[aria-label="thumbs up"]')
  }

  return behavior
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
  }

  handleFocus = () => this.setState({ focused: true })

  handleBlur = e => {
    this.setState({ focused: e.currentTarget.contains(e.relatedTarget) })
  }

  render() {
    return (
      <Menu
        {...this.props}
        accessibility={popoverBehavior}
        iconOnly
        className={cx(this.props.className, this.state.focused ? 'focused' : '')}
        items={[
          {
            key: 'smile',
            icon: 'smile',
            className: 'smile-emoji',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile one',
          },
          {
            key: 'smile2',
            icon: 'smile',
            className: 'smile-emoji',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile two',
          },
          {
            key: 'smile3',
            icon: 'smile',
            className: 'smile-emoji',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile three',
          },
          {
            key: 'a',
            icon: 'thumbs up',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'thumbs up',
          },
          {
            key: 'c',
            icon: 'ellipsis horizontal',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'more options',
            indicator: false,
            menu: {
              pills: true,
              items: [
                { key: 'bookmark', icon: 'folder', content: 'Save this message' },
                { key: 'linkify', icon: 'linkify', content: 'Copy link' },
                { key: 'translate', icon: 'translate', content: 'Translate' },
              ],
            },
          },
        ]}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        data-is-focusable={true}
      />
    )
  }
}

function ChatWithPopover() {
  return (
    <Provider
      theme={{
        componentStyles: {
          ChatMessage: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '& a': {
                color: siteVariables.colors.primary[500],
              },
            }),
          },
          Menu: {
            root: {
              background: '#fff',
              transition: 'opacity 0.2s',
              position: 'absolute',

              '& a:focus': {
                textDecoration: 'none',
                color: 'inherit',
              },
              '& a': {
                color: 'inherit',
              },

              '& .smile-emoji': {
                position: 'absolute',
                opacity: 0,
                zIndex: -1,
              },

              '&.focused .smile-emoji': {
                position: 'initial',
                zIndex: 'initial',
                opacity: 1,
              },

              '&:hover .smile-emoji': {
                position: 'initial',
                zIndex: 'initial',
                opacity: 1,
              },
            },
          },
        },
      }}
    >
      <Chat
        items={_.times(30, i => ({
          key: 'a' + i,
          message: {
            content: (
              <Chat.Message
                actionMenu={<Popover />}
                author="Jane Doe"
                content={{
                  content: (
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  ),
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
          },
          gutter: { content: <Avatar {...janeAvatar} /> },
        }))}
      />
    </Provider>
  )
}

const ChatExample = () => <ChatWithPopover />

export default ChatExample
