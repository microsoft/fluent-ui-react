import { Accessibility, Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'
import * as React from 'react'
import cx from 'classnames'

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

export default Popover
