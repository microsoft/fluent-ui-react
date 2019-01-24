import { Menu, toolbarBehavior, toolbarButtonBehavior, Accessibility } from '@stardust-ui/react'
import * as React from 'react'
import cx from 'classnames'

export interface PopoverProps {
  className?: string
}

interface PopoverState {
  focused: boolean
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
  }

  changeFocusState = (isFocused: boolean) => {
    this.state.focused !== isFocused && this.setState({ focused: isFocused })
  }

  handleFocus = () => {
    this.changeFocusState(true)
  }

  handleBlur = e => {
    const shouldPreserveFocusState = e.currentTarget.contains(e.relatedTarget)
    this.changeFocusState(shouldPreserveFocusState)
  }

  popoverStyles = ({ theme: { siteVariables } }) => ({
    transition: 'opacity 0.2s',
    position: 'absolute',
    top: '-20px',
    right: '5px',
    opacity: 0,

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
  })

  render() {
    const overridenToolbarBehavior: Accessibility = (props: any) => {
      const toolbarFocusZone = toolbarBehavior(props).focusZone
      toolbarFocusZone.props = {
        ...toolbarFocusZone.props,
        defaultTabbableElement: (root: HTMLElement): HTMLElement => {
          return root.querySelector('[aria-label="thumbs up"]')
        },
      }

      return {
        ...toolbarBehavior(props),
        focusZone: toolbarFocusZone,
      }
    }

    return (
      <Menu
        styles={this.popoverStyles}
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
        accessibility={overridenToolbarBehavior}
        data-is-focusable={true}
      />
    )
  }
}

export default Popover
