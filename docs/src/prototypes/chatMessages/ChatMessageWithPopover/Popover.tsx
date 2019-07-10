import { Accessibility, Menu, menuAsToolbarBehavior } from '@stardust-ui/react'
import * as React from 'react'
import cx from 'classnames'

export interface PopoverProps {
  className?: string
  setFixedMode?: React.Dispatch<React.SetStateAction<boolean>>
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
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

  render() {
    const { setOpen, setFixedMode, ...rest } = this.props
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
            onClick: () => {
              setOpen(false)
            },
          },
          {
            key: 'smile2',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile two',
            onClick: () => {
              setOpen(false)
            },
          },
          {
            key: 'smile3',
            icon: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile three',
            onClick: () => {
              setOpen(false)
            },
          },
          {
            key: 'a',
            icon: 'thumbs up',
            'aria-label': 'thumbs up',
            onClick: () => {
              setOpen(false)
            },
          },
          {
            key: 'c',
            icon: {
              name: 'ellipsis horizontal',
            },
            onMenuOpenChange: (e, { menuOpen }) => {
              if (menuOpen) {
                setOpen(true)
                setFixedMode(true)
              } else {
                setFixedMode(false)
                setOpen(false)
              }
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
