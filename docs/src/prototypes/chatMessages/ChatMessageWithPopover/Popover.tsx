import { Accessibility, Menu, menuAsToolbarBehavior } from '@stardust-ui/react'
import * as React from 'react'
import cx from 'classnames'

export interface PopoverProps {
  className?: string
  setFixedMode?: (val: boolean) => void
  setOpen?: (val: boolean) => void
  chatMessageRef?: HTMLElement
}

interface PopoverState {
  focused: boolean
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
  }

  handleFocus = () => this.setState({ focused: true })

  handleBlur = e => {
    this.setState({ focused: e.currentTarget.contains(e.relatedTarget) })
  }

  handleActionableItemClick = e => {
    const { setOpen, chatMessageRef } = this.props
    setOpen(false)
    e.type === 'keydown' && chatMessageRef && chatMessageRef.focus()
  }

  render() {
    const { setOpen, setFixedMode, ...rest } = this.props
    delete rest.chatMessageRef
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
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'smile2',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile two',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'smile3',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile three',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'a',
            icon: 'thumbs up',
            'aria-label': 'thumbs up',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'c',
            icon: 'ellipsis horizontal',
            onMenuOpenChange: (e, { menuOpen }) => {
              setOpen(true)
              setFixedMode(menuOpen)
            },
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

export default Popover
