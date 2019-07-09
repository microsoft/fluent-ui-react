import { Accessibility, Menu, menuAsToolbarBehavior } from '@stardust-ui/react'
import * as React from 'react'
import cx from 'classnames'

export interface PopoverProps {
  className?: string
  shouldCloseMenuHandler?: React.Dispatch<React.SetStateAction<boolean>>
}

interface PopoverState {
  focused: boolean
  submenuOpened: boolean
}

const popoverBehavior: Accessibility = (props: any) => {
  const behavior = menuAsToolbarBehavior(props)

  behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
    return root.querySelector('[aria-label="thumbs up"]')
  }

  return behavior
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
    submenuOpened: false,
  }

  handleFocus = () => this.setState({ focused: true })

  handleBlur = e => {
    this.setState({ focused: e.currentTarget.contains(e.relatedTarget) })
  }

  render() {
    const { shouldCloseMenuHandler, ...rest } = this.props
    return (
      <Menu
        {...rest}
        accessibility={popoverBehavior}
        iconOnly
        className={cx(this.props.className, this.state.focused ? 'focused' : '')}
        items={[
          {
            key: 'smile',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile one',
          },
          {
            key: 'smile2',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile two',
            onClick: () => shouldCloseMenuHandler(true),
          },
          {
            key: 'smile3',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile three',
            onClick: () => shouldCloseMenuHandler(true),
          },
          {
            key: 'a',
            icon: 'thumbs up',
            'aria-label': 'thumbs up',
            onClick: () => shouldCloseMenuHandler(true),
          },
          {
            key: 'c',
            icon: {
              name: 'ellipsis horizontal',
              onClick: () => {
                this.setState(prevState => {
                  shouldCloseMenuHandler(prevState.submenuOpened)
                  return { submenuOpened: !prevState.submenuOpened }
                })
              },
            },
            'aria-label': 'more options',
            indicator: false,
            menu: {
              pills: true,
              items: [
                {
                  key: 'bookmark',
                  onClick: () => {
                    this.setState({ submenuOpened: false })
                    shouldCloseMenuHandler(true)
                  },
                  icon: 'folder',
                  content: 'Save this message',
                },
                {
                  key: 'linkify',
                  onClick: () => {
                    this.setState({ submenuOpened: false })
                    shouldCloseMenuHandler(true)
                  },
                  icon: 'linkify',
                  content: 'Copy link',
                },
                {
                  key: 'translate',
                  onClick: () => {
                    this.setState({ submenuOpened: false })
                    shouldCloseMenuHandler(true)
                  },
                  icon: 'translate',
                  content: 'Translate',
                },
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

export default Popover
