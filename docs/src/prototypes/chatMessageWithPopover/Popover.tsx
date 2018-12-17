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

// import { AsyncData } from '../AsyncShorthand/AsyncShorthand'
import { defaultBehavior } from 'src/lib/accessibility'

export interface PopoverProps {
  className?: string
}

interface PopoverState {
  focused: boolean
  popupOpened: boolean
  isMessageBookmarked: boolean
  isMessageTranslated: boolean
  selectedEmojiIndex: number
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
    popupOpened: false,
    isMessageBookmarked: false,
    isMessageTranslated: false,
    selectedEmojiIndex: -1,
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

  handleEmojiClick = (e, props) => {
    if (props && props.index) {
      this.setState({
        selectedEmojiIndex: this.state.selectedEmojiIndex === props.index ? -1 : props.index,
      })
    }
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
    '& [aria-pressed="true"]': {
      color: 'red',
    },
    '& [aria-pressed="true"]:focus': {
      color: 'red',
    },
    '& [aria-pressed="true"]:hover': {
      color: 'red',
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
            className: cx('smile-emoji'),
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile one',
            'aria-pressed': this.state.selectedEmojiIndex === 0,
            onClick: this.handleEmojiClick,
            'aria-posinset': '1',
            'aria-setsize': '5',
          },
          {
            key: 'smile2',
            icon: 'smile',
            className: cx('smile-emoji'),
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile two',
            'aria-pressed': this.state.selectedEmojiIndex === 1,
            onClick: this.handleEmojiClick,
            'aria-posinset': '2',
            'aria-setsize': '5',
          },
          {
            key: 'smile3',
            icon: 'smile',
            className: cx('smile-emoji'),
            accessibility: toolbarButtonBehavior,
            'aria-label': 'smile three',
            'aria-pressed': this.state.selectedEmojiIndex === 2,
            onClick: this.handleEmojiClick,
            'aria-posinset': '3',
            'aria-setsize': '5',
          },
          {
            key: 'a',
            icon: 'thumbs up',
            accessibility: toolbarButtonBehavior,
            'aria-label': 'thumbs up',
            'aria-pressed': this.state.selectedEmojiIndex === 3,
            onClick: this.handleEmojiClick,
            'aria-posinset': '4',
            'aria-setsize': '5',
          },
          {
            key: 'separator',
            as: 'div',
            accessibility: toolbarButtonBehavior,
            content: '|',
            role: 'separator',
          },
          {
            key: 'context-menu',
            icon: 'ellipsis horizontal',
            role: 'menubutton',
            'aria-haspopup': true,
            'aria-label': 'more options',
            'aria-posinset': '5',
            'aria-setsize': '5',
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
    if (props.key !== 'context-menu') {
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
                {
                  key: 'bookmark',
                  icon: 'folder',
                  content: !this.state.isMessageBookmarked ? 'Save this message' : 'Unsave message',
                  'aria-label': 'Save this message',
                  'aria-checked': this.state.isMessageBookmarked,
                  onClick: () =>
                    this.setState({ isMessageBookmarked: !this.state.isMessageBookmarked }),
                  role: 'menuitemcheckbox',
                  'aria-posinset': '1',
                  'aria-setsize': '3',
                },
                {
                  key: 'linkify',
                  icon: 'linkify',
                  content: 'Copy link',
                  'aria-posinset': '2',
                  'aria-setsize': '3',
                },
                {
                  key: 'translate',
                  icon: 'translate',
                  content: !this.state.isMessageTranslated ? 'Translate' : 'Show original',
                  'aria-label': 'Translate',
                  'aria-checked': this.state.isMessageTranslated,
                  onClick: () =>
                    this.setState({ isMessageTranslated: !this.state.isMessageTranslated }),
                  role: 'menuitemcheckbox',
                  'aria-posinset': '3',
                  'aria-setsize': '3',
                },
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
    return <div className={classes.root}>{children}</div>
  },
})

interface ContextMenuProps {
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  children?: ReactChildren
}
