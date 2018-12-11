import {
  Menu,
  Popup,
  toolbarBehavior,
  popupFocusTrapBehavior,
  createComponent,
  ComponentSlotStyle,
  ComponentVariablesInput,
  toolbarButtonBehavior,
} from '@stardust-ui/react'
import { ReactChildren } from 'types/utils'
import * as React from 'react'
import cx from 'classnames'

export interface PopoverProps {
  className?: string
}

interface PopoverState {
  focused: boolean
  popupOpened: boolean
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
    popupOpened: false,
  }

  changeFocusState = (isFocused: boolean) => {
    this.state.focused !== isFocused && this.setState({ focused: isFocused })
  }

  handleFocus = () => {
    this.changeFocusState(true)
  }

  handleBlur = e => {
    // if e.relatedTarget === null it means the click was outside this container
    if (!this.state.popupOpened || e.relatedTarget === null) {
      const shouldPreserveFocusState = e.currentTarget.contains(e.relatedTarget)
      this.changeFocusState(shouldPreserveFocusState)
    } else {
      e.stopPropagation()
    }
  }

  handleMenuClick = () => {
    // close popup when other MenuItem clicked, but the event propagation was stopped
    this.state.popupOpened && this.setState({ popupOpened: false })
  }

  popoverStyles = ({ theme: { siteVariables } }) => ({
    transition: 'opacity 0.2s',
    position: 'absolute',
    top: '-20px',
    right: '5px',
    background: siteVariables.white,
    boxShadow: '0px 2px 4px #ddd',
    borderRadius: '.3rem',
    opacity: 0,

    '& .smile-emoji': {
      display: 'none',
    },

    '&.focused .smile-emoji': {
      display: 'flex',
    },

    '&:hover .smile-emoji': {
      display: 'flex',
    },
  })

  render() {
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
          },
        ].map(itemShorthandValue => render =>
          render(itemShorthandValue, this.renderItemOrContextMenu),
        )}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleMenuClick}
        accessibility={toolbarBehavior}
        data-is-focusable={true}
      />
    )
  }

  renderItemOrContextMenu = (MenuItem, props) => {
    if (props.icon !== 'ellipsis horizontal') {
      return <MenuItem {...props} />
    }

    return (
      <Popup
        key={props.key}
        position="below"
        accessibility={popupFocusTrapBehavior}
        trigger={
          <MenuItem
            {...props}
            onClick={e => {
              this.setState(prev => ({ popupOpened: !prev.popupOpened }))
            }}
          />
        }
        open={this.state.popupOpened}
        onOpenChange={(e, newProps) => {
          this.setState({ popupOpened: newProps.open })
        }}
        content={
          <ContextMenu>
            <Menu
              vertical
              pills
              className="actions"
              items={[
                { key: 'bookmark', icon: 'folder', content: 'Save this message' },
                { key: 'linkify', icon: 'linkify', content: 'Copy link' },
                { key: 'translate', icon: 'translate', content: 'Translate' },
              ]}
            />
          </ContextMenu>
        }
      />
    )
  }
}

export default Popover

const ContextMenu = createComponent<ContextMenuProps>({
  displayName: 'ContextMenu',
  render: ({ stardust, className, children }) => {
    const { classes } = stardust
    return <div className={cx(className, classes.root)}>{children}</div>
  },
})

interface ContextMenuProps {
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  children?: ReactChildren
}
